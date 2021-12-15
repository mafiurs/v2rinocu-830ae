export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const getBasePath = () => '/'.concat(_.split(_.trim(window.location.pathname, '/'), '/', 1));

export const capitalize = (str) => str?.replace(/^\w/, (c) => c.toUpperCase());

export const PROBABILITIES = { d: 37.5, r1: 9.375, r2: 3.125 };
export function sumProbs(sireTraits, matronTraits, part) {
  let probs = {};
  for (let place in sireTraits) {
    if (sireTraits[place] in probs) {
      probs[sireTraits[place]] += PROBABILITIES[place];
    } else {
      probs[sireTraits[place]] = PROBABILITIES[place];
    }
  }
  for (let place in matronTraits) {
    if (matronTraits[place] in probs) {
      probs[matronTraits[place]] += PROBABILITIES[place];
    } else {
      probs[matronTraits[place]] = PROBABILITIES[place];
    }
  }
  return {
    name: part,
    probs: Object.keys(sortObjectByValueDesc(probs)).map((key) => {
      return { card: key, prob: probs[key] };
    })
  };
}

export const setSearchParam = (name, value) => {
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  params.set(name, value);
  return `${window.location.pathname}?${params.toString()}`;
};
