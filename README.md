jframework
==========

진보네트워크센터에서 만드는 웹 프로젝트에서 공동으로 사용할 리소스들을 관리합니다.

폴더 구조
---------

* contrib -- 외부에서 가져온 리소스들. 서브모듈로 추가하는 대신 버전을 특정해서 사용합니다.
	* 단순 저장
		* [lessphp](http://leafo.net/lessphp/) -- (PHP) 개발 환경에서 사용할 백엔드 CSS 전처리 도구.
			* 0.4.0
		* [browser.php](http://chrisschuld.com/projects/browser-php-detecting-a-users-browser-from-php.html) -- (PHP) 서버 측에서 접속자 브라우저를 판별하기 위한 라이브러리.
			* 2015.05.04
		* [less.js](http://lesscss.org) -- (JS) 개발 환경에서 사용할 프론트엔드 CSS 전처리 도구.
			* 2.5.0
		* [modernizr](http://modernizr.com) -- (JS) HTML5/CSS3 호환성 검사 라이브러리.
			* 2.8.3
		* [mobile-detect.js](http://hgoebl.github.io/mobile-detect.js/) -- 모바일 브라우저 검사 라이브러리.
			* 1.0.0
		* [respond](https://github.com/scottjehl/Respond) -- IE8에서 반응형 처리를 보조하기 위한 fallback 라이브러리.
			* 1.4.2
		* [imagesloaded](http://imagesloaded.desandro.com/) -- (JS) 이미지가 실제로 로드됐을 때 사용자 함수를 실행하는 jQuery 플러그인.
			* 3.1.8
		* [imagefill.js](http://johnpolacek.github.io/imagefill.js/) -- (JS) 이미지가 부모 엘리먼트에 꽉 차도록 크기를 조정하는 jQuery 플러그인.
			* 2015.04.29
		* [swiper](http://www.idangero.us/swiper/) -- (JS, CSS) 슬라이드쇼를 생성하는 라이브러리. jQuery 플러그인 형식으로 사용함.
			* 3.0.7
		* [animate.css](http://daneden.github.io/animate.css) -- (CSS) CSS3 애니메이션 프리셋.
			* 3.1.0
		* [wow](http://mynameismatthieu.com/WOW/) -- (JS) 엘리먼트가 등장할 때 애니메이션을 적용하는 라이브러리.
			* 1.1.2
		* [skrollr](http://prinzhorn.github.io/skrollr/) -- (JS) 패럴랙스 애니메이션 라이브러리.
			* 0.6.29
		* [snap.svg](http://snapsvg.io/) -- (JS) SVG 객체를 다룰 수 있도록 도와주는 라이브러리.
			* 0.3.0
		* [svg.js](http://svgjs.com/) -- (JS) SVG 객체를 다룰 수 있도록 도와주는 라이브러리.
			* 1.0rc3
	* 사용자화
		* [jquery](http://jquery.com) -- (JS) 자바스크립트 프레임워크.
			* 2.1.3 -- data/resources.map.json
			* 1.11.2 -- data/resources.map.fallback.json
			* js/jquery.js에서 `jQuery.noConflict()` 메서드를 실행
		* [jquery-ui](http://jqueryui.com) -- (JS, CSS) 몇 가지 사용자 인터페이스 세트를 제공하는 jQuery 플러그인.
			* 1.11.4
			* less/jquery-ui.less > css/jquery-ui.css
		* [is-loading](http://hekigan.github.io/is-loading/) -- (JS) '로딩 중' 표시 기능을 제공하는 jQuery 플러그인.
			* 1.0.6
			* less/is-loading.less > css/is-loading.css
			* `.isLoading()` 대신 js/is-loading.js에 새로 정의한 `.jfLoading()` 메서드를 사용할 것.
		* [loaders.css](http://connoratherton.com/loaders) -- (CSS) '로딩 중' 표시에 사용할 CSS 애니메이션 스타일.
			* 0.1.1
		* [fancybox](http://fancyapps.com) -- (JS, CSS) 전체화면 오버레이 기능을 제공하는 jQuery 플러그인.
			* 2.1.5
			* `.fancybox()` 메서드에 옵션을 추가한 `jfFancybox()` 메서드를 js/fancybox.js에 추가함.
	* 직접 작성
		* regheight -- (JS) `data-height-mode` 옵션에 따라 블록 높이를 맟추는 스크립트.
			* 1.0
	* 기본 소스에 포함	
		* [normalize](https://github.com/necolas/normalize.css) -- (CSS) 초기화 코드.
			* 3.0.3
		* [bootstrap](https://github.com/twbs/bootstrap) -- (CSS) grid 및 responsive.
			* 3.3.4
			* `.tooltip()` 대신 js/bootstrap.js에 새로 정의한 `.jfTooltip()` 메서드를 사용할 것.
		* [font-awesome](https://github.com/FortAwesome/Font-Awesome) -- (CSS) 아이콘 폰트.
			* 4.3.0
		* [webfonts](https://github.com/singihae/Webfonts) -- (CSS) 한글 웹폰트.
			* 2015.01.14
		* jframework icons -- (CSS) 진보넷 프로젝트에 사용할 아이콘 폰트 및 스타일시트.
			* 코드 일람표는 docs/jfont/index.html 에서 확인할 것.
			* 2015.04.30
* svgs -- 자체 웹폰트 제작에 사용한 svg 파일들.
* fonts -- 자체 웹폰트 파일.
* less -- 외부 CSS 리소스들을 바탕으로 한 사용자 스타일시트 소스.
* css -- less 디렉토리의 소스들을 변환한 실제 스타일시트 파일.
* js -- jquery 베이스의 사용자 스크립트.
* html -- 글로벌 메뉴 등의: 마크업 컴포넌트.
* data -- 설정 파일 및 각 라이브러리의 의존성을 명시한 map 파일. (json 형식)
* test -- 개발용 샘플 모음.

resizeAny.js
------------
* 어떤 요소의 크기가 변했을 때 어떤 동작을 할 필요가 있을 때 사용한다.
* 예
```{.javascript}
	jQuery('selector').resizeAny(function(element){
		console.log(jQuery(element).widht());
	});
```

높이 조정 스크립트: regheight.js
------------------------------
* 사용
	* jQuery(_선택자_).regHeight(_user config_);
	* _user config_: config는 data/config.json에서 가져오지만, 사용자 config를 설정할 수 있다.
		* 예
		```{.javascript}
			jQuery('selector').regHeight({
				"grid_columns": 12,
				"screen_xs_min": 480,
				"screen_sm_min": 768,
				"screen_md_min": 992,
				"screen_lg_min": 1200 
			});
		```
	* 예
	```{.javascript}
		jQuery(document).ready(function(){
			jQuery('div[data-height-mode]').resizeAny(function(element){
				jQuery(element).regHeight();
			});
		});
	```
* 어트리뷰트
	* data-height-mode: 높이 조정의 모드를 결정한다.
		* 섹션(최상위 그룹)에서 사용한다. 하위의 모든 컬럼이 영향을 받는다.
		* 값
			* nounit: 폭에 대해서 임의의 비율로 높이를 결정한다.
			* _숫자_: 단위 높이의 배수를 높이로 결정한다. _숫자_는 단위 폭에 대한 단위 높이의 비를 의미한다. 단위 폭은 섹션의 폭을 부트스트랩에 지정된 그리드 수(혹은 그에 해당하는 사용자 그리드 수)론 나눈 값이다. 나누기 부호(/)를 사용할 수 있다.
		* 예
			* data-height-mode="nounit"
			* data-height-mode="1"
			* data-height-mode="1.5"
			* data-height-mode="2/3"
	* data-height-_브레이크 포인트_: 브레이크 포인트에 따른 높이의 비 혹은 배수를 결정한다.
		* 최하위 컬럼(타일)에서 사용한다.
		* _브레이트 포인트_: xs, sm, md, lg
		* 값: _숫자_
			* 정수(자연수)와 소수를 모두 사용할 수 있으며, 나누기 기호도 사용할 수 있다.
			* 'nounit' 모드의 경우에는 이 값이 해당 타일의 폭에 대한 해당 타일의 높이의 비를 나타내는 값이 된다.
			* 'nounit' 모드가 아닌 경우에는, 단위 높이에 이 값을 곱한 값을 해당 타일의 높이로 한다.
		* 예
			* data-height-sm="2"
			* data-height-xs="0.5"
			* data-height-lg="1/2"
	* data-gutter: 사이간격을 픽셀 단위로 설정한다.
		* 섹션(최상위 그룹)에서 사용한다.
		* 예
			* data-gutter="10"
	* 예
	```{.html}
		<div class="row" data-height-mode="nounit" data-gutter="10">
			<div class="col-xs-12 col-md-3" data-height-xs="1/6" data-height-md="2"></div>
			<div class="col-xs-12 col-md-6">
				<div class="row">
					<div class="col-xs-12" data-height-xs="1/6" data-height-md="1/2"></div>
				</div>
				<div class="row">
					<div class="col-xs-12 col-sm-6" data-height-xs="1/6" data-height-sm="1/2" data-height-md="1"></div>
					<div class="col-xs-12 col-sm-6" data-height-xs="1/6" data-height-sm="1/2" data-height-md="1"></div>
				</div>
			</div>
			<div class="col-xs-12 col-md-3" data-height-xs="1/6" data-height-md="2"></div>
		</div>
	```
