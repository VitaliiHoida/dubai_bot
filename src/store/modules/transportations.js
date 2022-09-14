import transportationsApi from '@/api/transportations';

export default {
    name: 'transportation',
    namespaced: true,
    state: {
        data: null,
    },
    mutations: {
        getTransportationsStart() {},
        getTransportationsSuccess(state, payload) {
            state.data = payload;
        },
        getTransportationsFailure() {},

        createTransportationsStart() {},
        createTransportationsSuccess() {},
        createTransportationsFailure() {},

    },
    actions: {
        getTransportation(context, slug) {
            return new Promise(resolve => {
                context.commit('getTransportationsStart');
                transportationsApi.getTransportation(slug)
                    .then(result => {
                        context.commit('getTransportationsSuccess', result);
                        resolve(result);
                    })
                    .catch(() => {
                        context.commit('getTransportationsFailure');
                    })
            });
        },
        createTransportation(context, {transportation}) {
            return new Promise(resolve => {
                context.commit('createTransportationsStart');
                transportationsApi.createTransportation(transportation)
                    .then(transportation => {
                        context.commit('createTransportationsSuccess', transportation)
                        resolve(transportation);
                    })
                    .catch(() => {
                        context.commit('createTransportationsFailure');
                    });
            })
        }
    },
}