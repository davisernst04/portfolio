"use client";
import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="px-4 sm:px-6 max-w-6xl mx-auto" role="contentinfo">
            <hr className="max-w-6xl mx-auto my-12 border-border" />

            <div className="flex flex-col sm:flex-row justify-between items-center py-8 gap-4">
                <div className="flex flex-col items-center sm:items-start">
                    <h3 className="text-lg font-semibold">Davis Ernst</h3>
                </div>

                <nav aria-label="Social media links">
                    <ul className="flex gap-5 items-center list-none m-0 p-0">
                        <li>
                            <a
                                href="https://github.com/davisernst04"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="GitHub profile"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://linkedin.com/in/davis-ernst-987391362"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="LinkedIn profile"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:davis.ernst@outlook.com"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Send email"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="text-center py-4 text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Davis Ernst. All rights reserved.</p>
            </div>
        </footer>
    );
}
