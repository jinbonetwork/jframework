jframework
==========

진보네트워크센터에서 만드는 웹 프로젝트에서 공동으로 사용할 리소스들을 관리합니다.

폴더 구조
---------

* contrib -- 외부에서 가져온 리소스들. 서브모듈로 추가하는 대신 버전을 특정해서 사용합니다.
	* 단순 저장
		* [less.js](http://lesscss.org) -- (JS) 개발 환경에서 사용할 프론트엔드 CSS 전처리 도구.
			* 2.5.0
		* [lessphp](http://leafo.net/lessphp/) -- (PHP) 개발 환경에서 사용할 백엔드 CSS 전처리 도구.
			* 0.4.0
		* [jquery](http://jquery.com) -- (JS) 자바스크립트 프레임워크.
			* 2.1.3
		* [fancybox](http://fancyapps.com) -- (JS, CSS) 전체화면 오버레이 기능을 제공하는 jQuery 플러그인.
			* 2.1.5
		* [imagesloaded]() -- (JS) 이미지가 실제로 로드됐을 때 사용자 함수를 실행하는 jQuery 플러그인.
			* 3.1.8
	* 사용자화
		* [jquery-ui](http://jqueryui.com) -- (JS, CSS) 몇 가지 사용자 인터페이스 세트를 제공하는 jQuery 플러그인.
			* 1.11.4
			* less/jquery-ui.less > css/jquery-ui.css
		* [is-loading]() -- (JS) '로딩 중' 표시 기능을 제공하는 jQuery 플러그인.
			* 1.0.6
			* less/is-loading.less > css/is-loading.css
	* 기본 소스에 포함	
		* [normalize](https://github.com/necolas/normalize.css) -- (CSS) 초기화 코드.
			* 3.0.3
		* [bootstrap](https://github.com/twbs/bootstrap) -- (CSS) grid 및 responsive.
			* 3.3.4
		* [font-awesome](https://github.com/FortAwesome/Font-Awesome) -- (CSS) 아이콘 폰트.
			* 4.3.0
		* [webfonts](https://github.com/singihae/Webfonts) -- (CSS) 한글 웹폰트.
			* 2015.01.14
* svgs -- 자체 웹폰트 제작에 사용한 svg 파일들.
* fonts -- 자체 웹폰트 파일.
* less -- 외부 CSS 리소스들을 바탕으로 한 사용자 스타일시트 소스.
* css -- less 디렉토리의 소스들을 변환한 실제 스타일시트 파일.
* js -- jquery 베이스의 사용자 스크립트.
* html -- 글로벌 메뉴 등의: 마크업 컴포넌트.
* data -- 마크업 컴포넌트에서 사용할 json 파일.
* test -- 개발용 샘플 모음.

높이 조정 스크립트(jquery.regHeight-1.0.js)의 사용
------------------------------
* 사용
	* jQuery(_선택자_).regHeight(_user config_);
	* 예
	```{.javascript}
		jQuery(document).ready(function(){
			resize();
		});
		jQuery(window).resize(function(){
			resize();
		});
		function resize(){
			jQuery('div[data-height-mode]').regHeight();
		}
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

