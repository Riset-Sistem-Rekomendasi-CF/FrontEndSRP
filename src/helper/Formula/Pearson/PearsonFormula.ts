
class PearsonFormula {
    constructor(
        private readonly userIndex: number,
        private readonly itemIndex: number,
        private readonly similarity: Array<number>,
        private readonly intersection: Array<number>,
        private readonly selectedMean: Array<number>,
        private readonly opsional: string,
        private readonly isNotation: boolean,
        private readonly denominator: number,
        private readonly numerator: number) { }


}