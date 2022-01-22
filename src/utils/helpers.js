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
  url = `${window.location.pathname}?${params.toString()}`;
  return { url, as: url, options: { scroll: false } };
};

export const appendSearchParam = (name, value) => {
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  params.append(name, value);
  url = `${window.location.pathname}?${params.toString()}`;
  return { url, as: url, options: { scroll: false } };
};

export const deleteSearchParam = (name) => {
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  params.delete(name);
  url = `${window.location.pathname}?${params.toString()}`;
  return { url, as: url, options: { scroll: false } };
};

export const appendPartToSearchParam = (name, value) => {
  let currentUrl = new URL(window.location.href);
  let params = new URLSearchParams(currentUrl.search);
  let newParams = new URLSearchParams('');
  const valuePart = value;
  const keysMatchingInParams = params.getAll(name).length;
  let url;
  if (keysMatchingInParams) {
    for (var pair of params.entries()) {
      const matchesCurrent = valuePart?.split('-')[0] === pair[1]?.split('-')[0];
      if (!matchesCurrent) {
        newParams.append(pair[0], pair[1]);
      }
    }
    newParams.append(name, value);

    url = `${window.location.pathname}?${newParams.toString()}`;
    return { url, as: url, options: { scroll: false } };
  } else {
    params.append(name, value);
    url = `${window.location.pathname}?${params.toString()}`;
    return { url, as: url, options: { scroll: false } };
  }
};

export const removePartFromSearchParam = (value) => {
  let currentUrl = new URL(window.location.href);
  let params = new URLSearchParams(currentUrl.search);
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
  const url = `${window.location.pathname}?${newParams.toString()}`;
  return { url, as: url, options: { scroll: false } };
  // return `${window.location.pathname}?${newParams.toString()}`;
};

export const range = (n) => Array.from(Array(n).keys());

export const getRouteParams = (params, options) => {
  const url = params
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname;
  const defaultOptions = { scroll: false };
  const as = options?.as ?? url;
  if (options?.as) {
    delete options.as;
  }

  return {
    url,
    as,
    options: { ...defaultOptions, options }
  };
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const getChunkColor = (num) => {
  if (num >= 15000) {
    return '#DC2626';
  } else if (num >= 12000) {
    return '#D97706';
  } else if (num >= 10000) {
    return '#FBBF24';
  } else if (num >= 5000) {
    return '#FCD34D';
  } else {
    return '#10B981';
  }
};
