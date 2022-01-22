// total = axie_list.get('total')
const filterResults = (results = []) => {
  let usefulAxiesList = [];
  results.forEach((axie) => {});
};

export { filterResults };

// def filter_results(results):
//     useful_axies_list = []
//     for axie in results:
//         axie_traits = getTraits(axie.get('genes'))
//         useful_axie = True
//         breeding_score = 0
//         for part in traits["parts_dict"].keys():
//             temp_filter_part = list(traits["parts_dict"][part].keys())[0]

//             if useful_axie == False:
//                 pass
//             elif temp_filter_part in singleProbs(axie_traits.get(part)) and singleProbs(axie_traits.get(part))[temp_filter_part]>=MIN_SINGLE_PURENESS:
//                 breeding_score += singleProbs(axie_traits.get(part))[temp_filter_part]
//                 useful_axie = True
//             else:
//                 useful_axie = False
//         if useful_axie == True and breeding_score >= MIN_BREEDING_SCORE:
//             #add part with probs to dataframe
//             filtered_axies.loc[len(filtered_axies.index)] = [axie.get('id'), axie.get('genes'), axie.get('auction').get('currentPriceUSD'), breeding_score]
//     return useful_axies_list
// def getSteps(total):
//     steps = 1
//     raw_steps = total / 100
//     initial_steps = raw_steps // 1
//     if total <= 100:
//         return 1
//     if raw_steps % initial_steps != 0:
//         steps = (raw_steps // 1) + 1
//     else:
//         steps = raw_steps
//     return int(steps)
// steps = getSteps(total)
// callNumber = 0
// for step in range(steps):
//     call_step = step
//     traits["step"] = call_step * 100
//     try:
//         axie_step_list = axie.get_axie_list_by_traits_2(**traits)
//         filter_results(axie_step_list.get('results'))
//     except:
//         pass
