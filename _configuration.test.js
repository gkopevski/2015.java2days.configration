'use strict';

describe('Configuration module', function () {

    var SERVICE_ENDPOINT, BEER_RAND_ENDPOINT, moduleProvider, moduleProviderInstantiated;
    beforeEach(module('common.configuration'));


    describe('Module provider', function () {

        /**
         * Use this approach when testing providers. Loading of the modules is deferred till an inject block is executed or,
         * the first test is executed. use an empty inject block to get the modules loaded.
         */
        beforeEach(function () {
            module(function (_moduleProviderProvider_, _SERVICE_ENDPOINT_, _BEER_RAND_ENDPOINT_) {
                SERVICE_ENDPOINT = _SERVICE_ENDPOINT_;
                BEER_RAND_ENDPOINT = _BEER_RAND_ENDPOINT_;
                moduleProvider = _moduleProviderProvider_;
            });
        });
        beforeEach(inject());

        beforeEach(inject(function(_moduleProvider_){
            moduleProviderInstantiated = _moduleProvider_;
        }));


        describe('Constants values', function () {
            it('should expect BEER_RAND_ENDPOINT to have proper value', function () {
                expect(BEER_RAND_ENDPOINT).toEqual('/beer/rand');
            });


            it('should expect SERVICE_ENDPOINT to have proper value', function () {
                expect(SERVICE_ENDPOINT).toEqual('https://prost.herokuapp.com/api/v1');
            });
        });


        it('should allow to register modules', function () {
            moduleProvider.register({
                name: 'firstModule'
            });
            expect(moduleProvider.modules.length).toBe(1);
        });

        it('should allow to get specific module', function () {
            moduleProvider.register({
                name: 'firstModule'
            });
            expect(moduleProviderInstantiated.get('firstModule')).toEqual({
                name: 'firstModule'
            });
        });

        it('should return all of the modules', function () {
            moduleProvider.register({
                name: 'firstModule'
            });
            moduleProvider.register({
                name: 'secondModule'
            });
            expect(moduleProviderInstantiated.getAll().length).toEqual(2);
            expect(moduleProviderInstantiated.getAll()).toEqual([
                {
                    name: 'firstModule'
                }, {
                    name: 'secondModule'
                }
            ]);
        });

        it('should allow to override already existing module', function () {
            moduleProvider.register({
                name:'firstModule',
                serviceName:'Service1'
            });
            expect(moduleProviderInstantiated.get('firstModule').serviceName).toEqual('Service1');

            moduleProviderInstantiated.set({
                name:'firstModule',
                serviceName:'Service2'
            });
            expect(moduleProviderInstantiated.get('firstModule').serviceName).toEqual('Service2');
        });
    });
});