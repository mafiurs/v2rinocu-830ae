import { singleProbs } from '../../utils/helpers';
const { AxieGene } = require('agp-npm/dist/axie-gene');
const MIN_SINGLE_PURENESS = 9.375;
const parsePartGenes = ({ d, r1, r2 }) => ({
  d: d.partId,
  r1: r1.partId,
  r2: r2.partId
});

const getTraits = (genes) => ({
  eyes: parsePartGenes(genes.eyes),
  mouth: parsePartGenes(genes.mouth),
  ears: parsePartGenes(genes.ears),
  horn: parsePartGenes(genes.horn),
  back: parsePartGenes(genes.back),
  tail: parsePartGenes(genes.tail)
});

const filterResults = (results = [], geneticPureness, selectedParts) => {
  let usefulAxies = [];

  const minBreedingScore = (geneticPureness * (selectedParts.length * 50)) / 100;
  results.forEach(({ id, genes, auction, stats, breedCount }) => {
    const axieGene = new AxieGene(genes);
    let axieUseful = true;
    let breedingScore = 0;
    let pureness = 0;
    const axieTraits = getTraits(axieGene);
    selectedParts.forEach((selectedPart) => {
      const part = selectedPart?.split('-')[0];
      const sProb = singleProbs(_.get(axieTraits, part));
      axieUseful = _.get(sProb, selectedPart, 0) >= MIN_SINGLE_PURENESS;
      if (axieUseful) {
        breedingScore += _.get(sProb, selectedPart, 0);
      }
    });
    pureness = ((breedingScore / (selectedParts.length * 50)) * 100).toFixed(2);
    if (axieUseful && breedingScore >= minBreedingScore) {
      usefulAxies = [
        ...usefulAxies,
        {
          id,
          genes: axieGene,
          breedingScore,
          auction,
          stats,
          breedCount,
          pureness
        }
      ];
    }
  });
  return usefulAxies;
};

export { filterResults };
