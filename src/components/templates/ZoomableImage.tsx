"use client";

import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut, Maximize, RotateCcw } from "lucide-react";

export default function ZoomableImage({ src, alt }: { src: string; alt: string }) {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isFullscreen, setIsFullscreen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 3));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 0.5));
    const handleReset = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
            if (!document.fullscreenElement) handleReset();
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const handleMouseDown = (e: ReactMouseEvent) => {
        if (scale === 1 && !isFullscreen) return;
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: ReactMouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => setIsDragging(false);

    // Zoom with scroll wheel
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (scale === 1 && !isFullscreen) return; // Keep standard scroll if not zoomed
        e.preventDefault();
        const delta = e.deltaY * -0.005;
        const newScale = Math.min(Math.max(scale + delta, 0.5), 3);
        setScale(newScale);
    };

    // Helper for rendering n8n style control buttons
    const ControlButton = ({
        icon: Icon,
        onClick,
        tooltip,
        disabled = false
    }: {
        icon: any;
        onClick: () => void;
        tooltip: string;
        disabled?: boolean;
    }) => (
        <div className="relative group/btn flex items-center justify-center">
            {/* Dark Tooltip pointing down */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap z-50">
                <div className="bg-[#1c1c28] text-white text-xs px-3 py-1.5 rounded shadow-lg border border-white/10 font-medium flex items-center gap-2">
                    {tooltip}
                </div>
                {/* Carrot pointing down */}
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#1c1c28] absolute -bottom-[5px] left-1/2 -translate-x-1/2" />
            </div>

            <button
                onClick={onClick}
                disabled={disabled}
                className={`w-10 h-10 rounded-[4px] bg-white border border-gray-200 flex items-center justify-center transition-all shadow-sm
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#ff5000] group/icon'}
                `}
            >
                <Icon className={`w-[18px] h-[18px] text-gray-500 transition-colors ${!disabled && 'group-hover/icon:text-[#ff5000]'}`} strokeWidth={1.5} />
            </button>
        </div>
    );

    return (
        <div
            ref={containerRef}
            className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${isFullscreen ? 'h-screen w-screen rounded-none border-none bg-white' : 'h-[500px] w-full bg-white border border-gray-200'}`}
        >
            {/* N8N Style Dot Background */}
            <div
                className="absolute inset-0 pointer-events-none bg-white"
                style={{
                    backgroundImage: 'radial-gradient(circle, #e5e5ea 1.5px, transparent 1.5px)',
                    backgroundSize: '24px 24px',
                    backgroundPosition: `${position.x % 24}px ${position.y % 24}px`,
                    opacity: 0.8
                }}
            />

            <div
                className={`w-full h-full flex items-center justify-center relative ${isDragging ? 'cursor-grabbing' : (scale > 1 || isFullscreen ? 'cursor-grab' : '')}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
            >
                <div
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transition: isDragging ? 'none' : 'transform 0.15s ease-out'
                    }}
                    className="relative w-full h-full p-6 sm:p-12 flex items-center justify-center"
                >
                    {src ? (
                        <div className="relative w-full h-full max-w-5xl mx-auto drop-shadow-xl">
                            <Image
                                src={src}
                                alt={alt}
                                fill
                                className="object-contain select-none"
                                draggable={false}
                                unoptimized
                            />
                        </div>
                    ) : (
                        <div className="text-gray-500 font-mono text-sm border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 z-10">No Image Available</div>
                    )}
                </div>
            </div>

            {/* Controls panel - N8N Style Square Buttons */}
            <div className="absolute bottom-6 left-6 flex items-center gap-3 z-20">
                <ControlButton
                    icon={Maximize}
                    onClick={toggleFullscreen}
                    tooltip="Full Screen"
                />
                <ControlButton
                    icon={ZoomIn}
                    onClick={handleZoomIn}
                    tooltip={`Zoom In <span class="bg-white/10 px-1.5 py-0.5 rounded text-[10px] ml-1">+</span>`}
                />
                <ControlButton
                    icon={ZoomOut}
                    onClick={handleZoomOut}
                    tooltip={`Zoom Out <span class="bg-white/10 px-1.5 py-0.5 rounded text-[10px] ml-1">-</span>`}
                />
                <ControlButton
                    icon={RotateCcw}
                    onClick={handleReset}
                    tooltip={`Zoom to Fit <span class="bg-white/10 px-1.5 py-0.5 rounded text-[10px] ml-1">1</span>`}
                    disabled={scale === 1 && position.x === 0 && position.y === 0}
                />
            </div>
        </div>
    );
}
