import citiesApi from '@/api/cities';

export default {
    name: 'cities',
    namespaced: true,
    state: {
        citiesTo: null,
        citiesFrom: null,
    },
    mutations: {
        getCityToStart() {},
        getCityToSuccess(state, payload) {
            state.citiesTo = payload.sort();
        },
        getCityToFailure() {},

        getCityFromStart() {},
        getCityFromSuccess(state, payload) {
            state.citiesFrom = payload.sort();
        },
        getCityFromFailure() {},

    },
    actions: {
        getCityTo(context) {
            return new Promise(resolve => {
                context.commit('getCityToStart');
                citiesApi.getCitiesTo()
                    .then(result => {
                        context.commit('getCityToSuccess', result);
                        resolve(result);
                    })
                    .catch(() => {
                        context.commit('getCityToFailure');
                    })
            });
        },
        getCityFrom(context) {
            return new Promise(resolve => {
                context.commit('getCityFromStart');
                citiesApi.getCitiesFrom()
                    .then(result => {
                        context.commit('getCityFromSuccess', result);
                        resolve(result);
                    })
                    .catch(() => {
                        context.commit('getCityFromFailure');
                    })
            });
        },
    },
}