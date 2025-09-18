'use client'
import { useLocation } from "@/context/locationContext";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { FaUtensils, FaPlane, FaMoneyBillWave, FaLandmark } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ItineraryPage() {
    const { itineraryData } = useLocation();

    const getTextFromNode = (node: React.ReactNode): string => {
        if (typeof node === "string" || typeof node === "number") return String(node);
        if (Array.isArray(node)) return node.map(getTextFromNode).join("");
        if (React.isValidElement(node)) return getTextFromNode(node.props.children);
        return "";
    };

    const renderWithIcons = (children: React.ReactNode) => {
        const plainText = getTextFromNode(children);
        let icon = null;

        if (plainText.toLowerCase().includes("travel"))
            icon = <FaPlane className="inline mr-2 text-purple-600 flex-shrink-0" />;
        else if (
            plainText.toLowerCase().includes("breakfast") ||
            plainText.toLowerCase().includes("lunch") ||
            plainText.toLowerCase().includes("snack")
        )
            icon = <FaUtensils className="inline mr-2 text-green-600 flex-shrink-0" />;
        else if (
            plainText.toLowerCase().includes("cost") ||
            plainText.toLowerCase().includes("budget")
        )
            icon = <FaMoneyBillWave className="inline mr-2 text-yellow-600 flex-shrink-0" />;
        else if (
            plainText.toLowerCase().includes("taj") ||
            plainText.toLowerCase().includes("agra fort")
        )
            icon = <FaLandmark className="inline mr-2 text-red-600 flex-shrink-0" />;

        return (
            <>
                {icon}
                {children}
            </>
        );
    };

    return (
        <div className="p-4 sm:p-6 md:p-12 max-w-3xl md:max-w-5xl mx-auto bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-purple-700 text-center animate-pulse break-words">
                Your Itinerary
            </h1>

            {itineraryData ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-4 sm:space-y-6"
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            h3: ({ node, ...props }) => (
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-purple-600 flex items-center gap-2 py-2 border-b border-gray-300 break-words">
                                    {renderWithIcons(props.children)}
                                </h3>
                            ),
                            h4: ({ node, ...props }) => (
                                <h4 className="text-lg sm:text-xl md:text-2xl font-medium mt-3 sm:mt-4 flex items-center gap-2 text-gray-800 break-words">
                                    {renderWithIcons(props.children)}
                                </h4>
                            ),
                            li: ({ node, ...props }) => (
                                <li className="mb-2 flex items-center gap-2 bg-white p-2 sm:p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow break-words">
                                    <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-purple-300 rounded-full flex-shrink-0"></span>
                                    {renderWithIcons(props.children)}
                                </li>
                            ),
                            a: ({ node, ...props }) => (
                                <a
                                    {...props}
                                    className="text-blue-600 underline hover:text-blue-800 transition-colors break-words"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {props.children}
                                </a>
                            ),
                            p: ({ node, ...props }) => (
                                <p className="mb-2 sm:mb-3 leading-relaxed text-gray-700 break-words">{props.children}</p>
                            ),
                        }}
                    >
                        {itineraryData}
                    </ReactMarkdown>
                </motion.div>
            ) : (
                <p className="text-gray-500 text-center text-base sm:text-lg">No itinerary available.</p>
            )}
        </div>
    );
}
