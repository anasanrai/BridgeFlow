import { Metadata } from "next";
import { siteConfig } from "@/data/site";
import DocsClient from "./DocsClient";

export const metadata: Metadata = {
    title: `Documentation | ${siteConfig.name}`,
    description: `Learn how to build, deploy, and scale automations with ${siteConfig.name}.`,
};

export default function DocsPage() {
    return <DocsClient />;
}
