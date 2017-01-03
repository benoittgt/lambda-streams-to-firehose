'use strict';
var index = require('../index.js');
var eventReceived = require('../event.json');
var expect = require('chai').expect;
var proxyquire = require('proxyquire').noCallThru();
var awsSdkMock = {};

describe('handler', function() {
    it('Succeed because of correct event' , function(done){
        let awsSdkMock = {
            config: {
                update: function() { }
            },
            Firehose: function () { },
            Kinesis: function () { },
            kinesis: {
                listTagsForStream: function () { }
            }
        }
        let context = {
            succeed: function() {
                done();
            },
            fail: function(err) {
                done(new Error('never context.fail'));
            }
        };
        let lambdaStreamToFirehose = proxyquire('../index', { 'aws-sdk': awsSdkMock });

        lambdaStreamToFirehose.handler(eventReceived, context);
    });
});
