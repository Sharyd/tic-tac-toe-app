export const calculateGridCols = (sqrtBoard: number): string => {
    const gridColsMap: Record<number, string> = {
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        7: 'grid-cols-7',
        8: 'grid-cols-8',
        9: 'grid-cols-9',
    }

    return gridColsMap[sqrtBoard] || 'grid-cols-10'
}

export const calculatePadding = (sqrtBoard: number): string => {
    const paddingMap: Record<number, string> = {
        7: 'p-5 md:p-8',
        6: 'p-5 md:p-10',
        5: 'p-5 md:p-10',
        4: 'p-9 md:p-12',
        3: 'p-11 md:p-20',
    }

    return paddingMap[sqrtBoard] || 'p-5 md:p-8'
}

export const calculateWidthAndHeight = (sqrtBoard: number): string => {
    const numberOfHeightOrWidth: Record<number, string> = {
        7: '30',
        6: '35',
        5: '40',
        4: '60',
        3: '70',
    }

    return numberOfHeightOrWidth[sqrtBoard] || '30'
}
