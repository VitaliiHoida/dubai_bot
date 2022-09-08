import transportationsApi from '@/api/transportations';

export default {
    name: 'transportation',
    namespaced: true,
    state: {
        data: null,
        isLoading: false,
        error: null,
        comments: null,
    },
    mutations: {
        getTransportationsStart() {},
        getTransportationsSuccess() {},
        getTransportationsFailure() {},

        createTransportationsStart() {},
        createTransportationsSuccess() {},
        createTransportationsFailure() {},


        /*getArticleStart(state) {
            state.isLoading = true;
            state.data = null;
        },
        getArticleSuccess(state, payload) {
            state.isLoading = false;
            state.data = payload;
        },
        getArticleFailure(state) {
            state.isLoading = false;
        },*/
    },
    actions: {
        getTranspotation(context, {slug}) {
            return new Promise(resolve => {
                context.commit('getTransportationsStart', slug);
                transportationsApi.getTransportation(slug)
                    .then(article => {
                        context.commit('getTransportationsSuccess', article);
                        resolve(article);
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
                    .then(article => {
                        context.commit('createTransportationsSuccess', article)
                        resolve(article);
                    })
                    .catch(result => {
                        context.commit('createTransportationsFailure', result.response.data.errors);
                    });
            })
        }
    },
}