'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lottieWeb = require('lottie-web');

var _lottieWeb2 = _interopRequireDefault(_lottieWeb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Lottie = function (_React$Component) {
  (0, _inherits3.default)(Lottie, _React$Component);

  function Lottie() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Lottie);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Lottie.__proto__ || (0, _getPrototypeOf2.default)(Lottie)).call.apply(_ref, [this].concat(args))), _this), _this.handleClickToPause = function () {
      // The pause() method is for handling pausing by passing a prop isPaused
      // This method is for handling the ability to pause by clicking on the animation
      if (_this.anim.isPaused) {
        _this.anim.play();
      } else {
        _this.anim.pause();
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Lottie, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          options = _props.options,
          playSegments = _props.playSegments,
          goToAndPlay = _props.goToAndPlay,
          goToAndStop = _props.goToAndStop,
          eventListeners = _props.eventListeners;
      var loop = options.loop,
          autoplay = options.autoplay,
          animationData = options.animationData,
          rendererSettings = options.rendererSettings;


      this.options = {
        container: this.el,
        renderer: 'svg',
        loop: loop !== false,
        autoplay: autoplay !== false,
        playSegments: playSegments.segments !== null,
        goToAndPlay: goToAndPlay.value !== null,
        goToAndStop: goToAndStop.value !== null,
        animationData: animationData,
        rendererSettings: rendererSettings
      };

      this.options = (0, _extends3.default)({}, this.options, options);
      this.anim = _lottieWeb2.default.loadAnimation(this.options);

      // Immediately handle goTo's if necessary.
      if (this.options.goToAndPlay) {
        this.goToAndPlay();
      }
      if (this.options.goToAndStop) {
        this.goToAndStop();
      }
      if (this.options.playSegments) {
        this.playSegments();
      }
      this.registerEvents(eventListeners);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps /* , nextState */) {
      /* Recreate the animation handle if the data is changed */
      if (this.options.animationData !== nextProps.options.animationData) {
        this.deRegisterEvents(this.props.eventListeners);
        this.destroy();
        this.options = (0, _extends3.default)({}, this.options, nextProps.options);
        this.anim = _lottieWeb2.default.loadAnimation(this.options);
        this.registerEvents(nextProps.eventListeners);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.isStopped) {
        this.stop();
      } else if (this.options.playSegments) {
        this.playSegments();
      } else {
        this.play();
      }

      if ((0, _stringify2.default)(this.props.goToAndPlay) !== (0, _stringify2.default)(prevProps.goToAndPlay)) {
        this.goToAndPlay();
      }

      if ((0, _stringify2.default)(this.props.goToAndStop) !== (0, _stringify2.default)(prevProps.goToAndStop)) {
        this.goToAndStop();
      }

      this.pause();
      this.setSpeed();
      this.setDirection();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.deRegisterEvents(this.props.eventListeners);
      this.destroy();
      this.options.animationData = null;
      this.anim = null;
    }
  }, {
    key: 'setSpeed',
    value: function setSpeed() {
      this.anim.setSpeed(this.props.speed);
    }
  }, {
    key: 'setDirection',
    value: function setDirection() {
      this.anim.setDirection(this.props.direction);
    }
  }, {
    key: 'play',
    value: function play() {
      this.anim.play();
    }
  }, {
    key: 'playSegments',
    value: function playSegments(args) {
      var _props$playSegments = this.props.playSegments,
          segments = _props$playSegments.segments,
          forceFlag = _props$playSegments.forceFlag;

      if (args) {
        segments = args.segments,
        forceFlag = args.forceFlag;
      }
          
      this.anim.playSegments(segments, forceFlag);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.anim.stop();
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (this.props.isPaused && !this.anim.isPaused) {
        this.anim.pause();
      } else if (!this.props.isPaused && this.anim.isPaused) {
        this.anim.pause();
      }
    }
  }, {
    key: 'goToAndPlay',
    value: function goToAndPlay() {
      console.log('#goToAndPlay ', this.props.goToAndPlay);
      var _props$goToAndPlay = this.props.goToAndPlay,
          value = _props$goToAndPlay.value,
          isFrame = _props$goToAndPlay.isFrame;

      this.anim.goToAndPlay(value, isFrame);
    }
  }, {
    key: 'goToAndStop',
    value: function goToAndStop(args) {
      var _props$goToAndStop = this.props.goToAndStop,
          value = _props$goToAndStop.value,
          isFrame = _props$goToAndStop.isFrame;

      if (args) {
        value = args.value,
        isFrame = args.isFrame;
      }

      this.anim.goToAndStop(value, isFrame);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.anim.destroy();
    }
  }, {
    key: 'registerEvents',
    value: function registerEvents(eventListeners) {
      var _this2 = this;

      eventListeners.forEach(function (eventListener) {
        _this2.anim.addEventListener(eventListener.eventName, eventListener.callback);
      });
    }
  }, {
    key: 'deRegisterEvents',
    value: function deRegisterEvents(eventListeners) {
      var _this3 = this;

      eventListeners.forEach(function (eventListener) {
        _this3.anim.removeEventListener(eventListener.eventName, eventListener.callback);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props2 = this.props,
          width = _props2.width,
          height = _props2.height,
          ariaRole = _props2.ariaRole,
          ariaLabel = _props2.ariaLabel,
          isClickToPauseDisabled = _props2.isClickToPauseDisabled,
          title = _props2.title;


      var getSize = function getSize(initial) {
        var size = void 0;

        if (typeof initial === 'number') {
          size = initial + 'px';
        } else {
          size = initial || '100%';
        }

        return size;
      };

      var lottieStyles = (0, _extends3.default)({
        width: getSize(width),
        height: getSize(height),
        overflow: 'hidden',
        margin: '0 auto',
        outline: 'none'
      }, this.props.style);

      var onClickHandler = isClickToPauseDisabled ? function () {
        return null;
      } : this.handleClickToPause;

      return (
        // Bug with eslint rules https://github.com/airbnb/javascript/issues/1374
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        _react2.default.createElement('div', {
          ref: function ref(c) {
            _this4.el = c;
          },
          style: lottieStyles,
          onClick: onClickHandler,
          title: title,
          role: ariaRole,
          'aria-label': ariaLabel,
          tabIndex: '0'
        })
      );
    }
  }]);
  return Lottie;
}(_react2.default.Component);

exports.default = Lottie;


Lottie.propTypes = {
  eventListeners: _propTypes2.default.arrayOf(_propTypes2.default.object),
  options: _propTypes2.default.object.isRequired,
  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  isStopped: _propTypes2.default.bool,
  isPaused: _propTypes2.default.bool,
  goToAndPlay: _propTypes2.default.shape({
    value: _propTypes2.default.number,
    isFrame: _propTypes2.default.bool
  }),
  goToAndStop: _propTypes2.default.shape({
    value: _propTypes2.default.number,
    isFrame: _propTypes2.default.bool
  }),
  speed: _propTypes2.default.number,
  playSegments: _propTypes2.default.shape({
    segments: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.number), _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.number))]),
    forceFlag: _propTypes2.default.bool
  }),
  direction: _propTypes2.default.number,
  ariaRole: _propTypes2.default.string,
  ariaLabel: _propTypes2.default.string,
  isClickToPauseDisabled: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  style: _propTypes2.default.string
};

Lottie.defaultProps = {
  eventListeners: [],
  isStopped: false,
  isPaused: false,
  goToAndPlay: {
    value: null,
    isFrame: false
  },
  goToAndStop: {
    value: null,
    isFrame: false
  },
  playSegments: {
    segments: null,
    forceFlag: false
  },
  speed: 1,
  ariaRole: 'button',
  ariaLabel: 'animation',
  isClickToPauseDisabled: false,
  title: ''
};