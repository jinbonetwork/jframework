regheight.js
============

높이 조정 스크립트.

* 사용
	* jQuery(_선택자_).regHeight(_userConfig_, _isEnabled_);
	* _userConfig_: config는 data/config.json에서 가져오지만, 사용자 config를 설정할 수 있다.
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
			jQuery('selector').regHeight('//exmaple.com/config.json');
		```
	* _isEnabled_: false이면 높이 조정은 하지 않고 config 객체만 반환한다.
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

