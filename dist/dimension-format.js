"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDimension = formatDimension;
exports.formatDimensionWithUnit = formatDimensionWithUnit;
exports.formatDimensions = formatDimensions;
function formatDimension(value, unit) {
    if (unit === "b") {
        return String(value);
    }
    if (unit === "k") {
        return String(Math.round(value / 1000));
    }
    return String(Math.round(value / 1000000));
}
function formatDimensionWithUnit(value, unit) {
    return formatDimension(value, unit);
}
function formatDimensions(width, height, unit) {
    return `${formatDimension(width, unit)}x${formatDimension(height, unit)}`;
}
