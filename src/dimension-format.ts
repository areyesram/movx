import { DimensionUnit } from "./strategy";

export function formatDimension(value: number, unit: DimensionUnit): string {
    if (unit === "b") {
        return String(value);
    }

    if (unit === "k") {
        return String(Math.round(value / 1000));
    }

    return String(Math.round(value / 1000000));
}

export function formatDimensionWithUnit(
    value: number,
    unit: DimensionUnit,
): string {
    return formatDimension(value, unit);
}

export function formatDimensions(
    width: number,
    height: number,
    unit: DimensionUnit,
): string {
    return `${formatDimension(width, unit)}x${formatDimension(height, unit)}`;
}
