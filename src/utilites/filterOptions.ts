const filterOptions = (
    options: Record<string, { text: string; risk: string }>
): Record<string, { text: string; risk: string }> => {
    const filteredOptions: Record<string, { text: string; risk: string }> = {};

    for (const [key, { text, risk }] of Object.entries(options)) {
        if (text && text.trim() && text !== 'undefined' && text !== 'null') {
            filteredOptions[key] = { text, risk };
        }
    }

    return filteredOptions;
};

export default filterOptions;
