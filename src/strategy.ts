export type DimensionUnit = "b" | "k" | "m";

export interface StrategyOptions {
    dimensionUnit: DimensionUnit;
}

export interface Strategy {
    getTargetDir(
        filePath: string,
        options?: StrategyOptions,
    ): string | null | Promise<string | null>;
}
