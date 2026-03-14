import { Metadata } from "next";
import { siteConfig } from "@/data/site";
import ApiReferenceClient from "./ApiReferenceClient";

export const metadata: Metadata = {
    title: `API Reference | ${siteConfig.name}`,
    description: `Programmatic access to the ${siteConfig.name} automation platform.`,
};

export default function APIReferencePage() {
    return <ApiReferenceClient />;
}
