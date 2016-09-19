// build environment

declare let NODE_ENV: string;
declare let VERSION: string;

// app environment

interface ErrorStackTraceLimit {
  stackTraceLimit: number;
}

// Extend typings
interface ErrorConstructor extends ErrorStackTraceLimit {}
