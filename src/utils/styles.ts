export const applyClassNameIfTrue = (
    condition: unknown,
    className: string,
    elseClassName?: string,
    noSpace?: "noSpace"
) => {
    const space = noSpace ? "" : " ";

    if (!condition) {
        if (elseClassName) {
            return `${space}${elseClassName}`;
        }

        return "";
    }

    return `${space}${className}`;
};
