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

export const appendSearchParam = (name, value) => {
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  params.append(name, value);
  return `${window.location.pathname}?${params.toString()}`;
};

export const deleteSearchParam = (name) => {
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  params.delete(name);
  return `${window.location.pathname}?${params.toString()}`;
};

export const appendPartToSearchParam = (name, value) => {
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  let newParams = new URLSearchParams('');
  const valuePart = value;
  const keysMatchingInParams = params.getAll(name).length;
  if (keysMatchingInParams) {
    for (var pair of params.entries()) {
      const matchesCurrent = valuePart?.split('-')[0] === pair[1]?.split('-')[0];
      if (!matchesCurrent) {
        newParams.append(pair[0], pair[1]);
      }
    }
    newParams.append(name, value);
    return `${window.location.pathname}?${newParams.toString()}`;
  } else {
    params.append(name, value);
    return `${window.location.pathname}?${params.toString()}`;
  }
};

export const removePartFromSearchParam = (value) => {
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  let newParams = new URLSearchParams('');
  const valuePart = value;
  for (var pair of params.entries()) {
    const matchesCurrent = valuePart?.split('-')[0] === pair[1]?.split('-')[0];
    if (!matchesCurrent) {
      newParams.append(pair[0], pair[1]);
    } else {
      continue;
    }
  }

  return `${window.location.pathname}?${newParams.toString()}`;
};

export const range = (n) => Array.from(Array(n).keys());
