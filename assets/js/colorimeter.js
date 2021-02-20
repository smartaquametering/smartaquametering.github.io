var VersionNumber='0.0.1';
var VersionDate='2020-12-29';
var Repository='smartColorimeter';
var RepositoryPath='https://github.com/smartaquametering/smartPhotometer';
var Owner='smartAquaMetering';
var OwnerPath='https://github.com/smartaquametering';
var Copyright='Copyright © 2020-2021'
var CopyrightPath='https://github.com/smartaquametering/smartPhotometer/blob/main/LICENSE';
var Release=Repository+' - '+VersionNumber+' ('+VersionDate+')';

var AssetsPath='https://smartaquametering.github.io/assets/';

var SelectedSourceWhite;
var SelectedRefWhite;
var SelectedRGBModel;
var SelectedAdaptationMethod;
var SelectedColorScale;

$(function() {
	document.getElementById('Logo').src=AssetsPath+'images/logo.png';
	document.getElementById('AboutModalBanner').href=RepositoryPath;
	document.getElementById('AboutModalBannerImg').src=AssetsPath+'images/banner.png';
	document.getElementById('AboutSupport').href=RepositoryPath;
	document.getElementById('AboutSupport').innerHTML=RepositoryPath;
	document.getElementById('AboutRepository').href=RepositoryPath;
	document.getElementById('AboutRepository').innerHTML=RepositoryPath;
	document.getElementById('AboutCopyright').href=CopyrightPath;
	document.getElementById('AboutCopyright').innerHTML=Copyright;
	document.getElementById('AboutOwner').href=OwnerPath;
	document.getElementById('AboutOwner').innerHTML=Owner;
	document.getElementById('AboutRelease').innerHTML=Release;
	document.getElementById('HelpModalBanner').href=RepositoryPath;
	document.getElementById('HelpModalBannerImg').src=AssetsPath+'images/banner.png';
	document.getElementById('FooterRepository').href=RepositoryPath;
	document.getElementById('FooterRepository').innerHTML=Repository+' - '+VersionNumber;
	document.getElementById('FooterOwner').href=OwnerPath;
	document.getElementById('FooterOwner').innerHTML=Owner;

	var SensorXYZ = {};
	var SensorxyY = {};
	var SensorRGB = {};
	var SensorLab = {};

	var SensorCCT = {};

	var SampleXYZ = {};
	var SampleLab = {};
	var SampleCCT = {};

	var EmptySampleXYZ = {};
	var EmptySampleLab = {};
	var EmptySampleCCT = {};

	var swaction=0;
	var ProtocolID=0;
	var ProtocolData=[];
	var LogData=[];
	var ReadingData=new Array();
		ReadingData[0]=new Array();
		ReadingData[1]=new Array();
		ReadingData[2]=new Array();
			ReadingData[2]['Switch']='Empty Sample';
			ReadingData[2]['GPIO']='16';
		ReadingData[3]=new Array();
			ReadingData[3]['Switch']='Sample';
			ReadingData[3]['GPIO']='16';
		ReadingData[4]=new Array();
			ReadingData[4]['ColorSpace']='-';
			ReadingData[4]['ColorSpaceValue1']='';
			ReadingData[4]['ColorSpaceValue01']='';
			ReadingData[4]['Light']='Warm White';
			ReadingData[4]['Wavelength']='410-780';
			ReadingData[4]['GPIO']='12';
			ReadingData[4]['BeamAngle']='180';
			ReadingData[4]['Thickness']='1.4';
		ReadingData[5]=new Array();
			ReadingData[5]['ColorSpace']='CIE-XYZ';
			ReadingData[5]['ColorSpaceValue1']='';
			ReadingData[5]['ColorSpaceValue01']='';
		ReadingData[6]=new Array();
			ReadingData[6]['ColorSpace']='CIE-xyY';
			ReadingData[6]['ColorSpaceValue1']='';
			ReadingData[6]['ColorSpaceValue01']='';
		ReadingData[7]=new Array();
			ReadingData[7]['ColorSpace']='CIE-L*a*b*';
			ReadingData[7]['ColorSpaceValue1']='';
			ReadingData[7]['ColorSpaceValue01']='';
			ReadingData[7]['ColorDifference']='';
		ReadingData[8]=new Array();
			ReadingData[8]['ColorSpace']='CIE-L*u*v*';
			ReadingData[8]['ColorSpaceValue1']='';
			ReadingData[8]['ColorSpaceValue01']='';
			ReadingData[8]['ColorDifference']='';
		ReadingData[9]=new Array();
			ReadingData[9]['ColorSpace']='sRGB';
			ReadingData[9]['ColorSpaceValue1']='';
			ReadingData[9]['ColorSpaceValue01']='';
			ReadingData[9]['ColorDifference']='';
		ReadingData[10]=new Array();
			ReadingData[10]['ColorSpace']='CCT';
			ReadingData[10]['ColorSpaceValue1']='';
			ReadingData[10]['ColorSpaceValue01']='';
		ReadingData[11]=new Array();
			ReadingData[11]['ColorSpace']='Dominant λ';
			ReadingData[11]['ColorSpaceValue1']='';
			ReadingData[11]['ColorSpaceValue01']='';
		ReadingData[12]=new Array();
			ReadingData[12]['ColorSpace']='Nearest color(s)';
			ReadingData[12]['ColorSpaceValue1']='';
			ReadingData[12]['ColorSpaceValue01']='';
	var SensorData=new Array();
		SensorData[0]=new Array();
			SensorData[0]['Parameter']='<b>CIE-XYZ</b>';
			SensorData[0]['MeasuredValue']='';
			SensorData[0]['ScaledValue']='<input type="checkbox" id="ScaleXYZ">';
		SensorData[1]=new Array();
			SensorData[1]['Parameter']='<b>CIE-xyY</b>';
			SensorData[1]['MeasuredValue']='';
			SensorData[1]['ScaledValue']='<input type="checkbox" id="ScalexyY">';
		SensorData[2]=new Array();
			SensorData[2]['Parameter']='<b>CIE-L*a*b*</b>';
			SensorData[2]['MeasuredValue']='';
			SensorData[2]['ScaledValue']='';
		SensorData[3]=new Array();
			SensorData[3]['Parameter']='<b>CIE-L*u*v*</b>';
			SensorData[3]['MeasuredValue']='';
			SensorData[3]['ScaledValue']='';
		SensorData[4]=new Array();
			SensorData[4]['Parameter']='<b>Hunter-Lab</b>';
			SensorData[4]['MeasuredValue']='';
			SensorData[4]['ScaledValue']='';
		SensorData[5]=new Array();
			SensorData[5]['Parameter']='<b>RGB</b>';
			SensorData[5]['MeasuredValue']='';
			SensorData[5]['ScaledValue']='<input type="checkbox" id="ScaleRGB">';
		SensorData[6]=new Array();
			SensorData[6]['Parameter']='<b>CCT</b> [K]';
			SensorData[6]['MeasuredValue']='';
			SensorData[6]['ScaledValue']='';
		SensorData[7]=new Array();
			SensorData[7]['Parameter']='<b>Dominant λ</b> [nm]';
			SensorData[7]['MeasuredValue']='';
			SensorData[7]['ScaledValue']='';
		SensorData[8]=new Array();
			SensorData[8]['Parameter']='<b>Nearest color(s)</b>';
			SensorData[8]['MeasuredValue']='';
			SensorData[8]['ScaledValue']='';
	function loopDeLoop(e,s){
		var a,l,o=0;
		isNaN(s)&&(s=1),null==e&&(e=1e3);
		var n=setInterval(function(){
			o>0?clearInterval(n):++s>1?o=1:(fetch("./json?view=sensorupdate").then(function(s){
				var o;200===s.status?s.json().then(function(s){
					for(e=s.TTL,a=0;a<s.Sensors.length;a++)
						if(s.Sensors[a].hasOwnProperty("TaskValues"))
							for(l=0;l<s.Sensors[a].TaskValues.length;l++)
								try{o=s.Sensors[a].TaskValues[l].Value}catch(e){o=e.name}finally{
									if("TypeError"!==o){
										tempValue=s.Sensors[a].TaskValues[l].Value;
										if(s.Sensors[a].TaskNumber<3){
											decimalsValue=s.Sensors[a].TaskValues[l].NrDecimals;
											tempValue=parseFloat(tempValue).toFixed(decimalsValue);
											if (s.Sensors[a].TaskNumber==1) {
//												SensorData[(s.Sensors[a].TaskValues[l].ValueNumber-1)]['MeasuredValue']=tempValue;
												if (s.Sensors[a].TaskValues[l].ValueNumber==1) {
													SensorXYZ.X = parseFloat(tempValue);
												} else if (s.Sensors[a].TaskValues[l].ValueNumber==2) {
													SensorXYZ.Y = parseFloat(tempValue);
												} else if (s.Sensors[a].TaskValues[l].ValueNumber==3) {
													SensorXYZ.Z = parseFloat(tempValue);
												} else if (s.Sensors[a].TaskValues[l].ValueNumber==4) {
													SensorCCT.Sensor = parseFloat(tempValue);
												}
											} else if (s.Sensors[a].TaskNumber==2 && $('#switch_2').prop('checked')===true) {
												if (s.Sensors[a].TaskValues[l].ValueNumber==1) {
													EmptySampleXYZ.X = parseFloat(tempValue);
												} else if (s.Sensors[a].TaskValues[l].ValueNumber==2) {
													EmptySampleXYZ.Y = parseFloat(tempValue);
												} else if (s.Sensors[a].TaskValues[l].ValueNumber==3) {
													EmptySampleXYZ.Z = parseFloat(tempValue);
												}
											} else if (s.Sensors[a].TaskNumber==2 && $('#switch_3').prop('checked')===true) {
												if (s.Sensors[a].TaskValues[l].ValueNumber==1) {
													SampleXYZ.X = parseFloat(tempValue);
												} else if (s.Sensors[a].TaskValues[l].ValueNumber==2) {
													SampleXYZ.Y = parseFloat(tempValue);
												} else if (s.Sensors[a].TaskValues[l].ValueNumber==3) {
													SampleXYZ.Z = parseFloat(tempValue);
												}
											}
										} else {
											var sw="switch_"+(s.Sensors[a].TaskNumber);
											var swd=document.getElementById(sw);
											if (tempValue==0 && $(swd).prop('checked')===true && swaction==0) {
												$(swd).bootstrapToggle('enable', false);
												$(swd).bootstrapToggle('off', false);
											} else if (tempValue==0 && sw=="switch_3" && swaction==0 && $('#switch_2').prop('checked')===true) {
												$('#switch_2').bootstrapToggle('enable', false);
												$('#switch_2').bootstrapToggle('off', false);
											} else if (tempValue==0 && $(swd).prop('checked')===true) {
												swaction = 0;
											} else if (tempValue==1 && $(swd).prop('checked')===false && swaction==0) {
												$(swd).bootstrapToggle('on', false);
											} else if ($(swd).prop('checked')===false) {
												swaction = 0;
											};
										}
									}
								}
								e=s.TTL,
								clearInterval(n),
								UpdateSensorData(),
								AppendLogData(),
								loopDeLoop(e,0)
				}):console.log("Looks like there was a problem. Status Code: "+s.status)
			}).catch(function(s){
			}),o=1
		)},e)
	}loopDeLoop(1e3,0);

	function LedSwitches(state) {
		for (i = 2; i < 5; i++) {
			var switchid = "#switch_" + i;
			$(switchid).bootstrapToggle(state);
		}
	};
	// Empty Sample
	$('#switch_2').change(function() {
		if ($(this).prop('checked')===true) {
			swaction = 1;
			$.get('./control?cmd=GPIO,'+ReadingData[2]['GPIO']+',1');
			LedSwitches('disable');
			ResetReadingData();
		} else {
			LedSwitches('enable');
			UpdateReadingData('EmptySample');
		}
	});
	// Sample
	$('#switch_3').change(function() {
		if ($(this).prop('checked')===true) {
			swaction = 1;
			$.get('./control?cmd=GPIO,'+ReadingData[3]['GPIO']+',1');
			LedSwitches('disable');
			ResetTransmissionReadingData();
		} else {
			LedSwitches('enable');
			UpdateReadingData('Sample');
			AppendProtocolData();
		}
	});
	// Warm White LED
	$('#switch_4').change(function() {
		swaction = 1;
		if ($(this).prop('checked')===true) {
			swaction = 1;
			$.get('./control?cmd=GPIO,'+ReadingData[4]['GPIO']+',1');
		} else {
			$.get('./control?cmd=GPIO,'+ReadingData[4]['GPIO']+',0');
		}
	});
	$('#SensorTable').bootstrapTable('destroy').bootstrapTable({
		columns: [{
			field: 'Parameter',
			title: 'Sensor'
		}, {
			field: 'MeasuredValue',
			title: 'Values'
		}, {
			field: 'ScaledValue',
			title: 'Scale'
		}],
		data: SensorData
	});
	$('#ReadingTable').bootstrapTable('destroy').bootstrapTable({
		columns: [{
			field: 'Light',
			title: 'Light',
			align: 'left'
		}, {
			field: 'Wavelength',
			title: 'λ',
			align: 'left'
		}, {
			field: 'BeamAngle',
			title: '<var>B<sup>o</sup></var>',
			align: 'right'
		}, {
			field: 'Thickness',
			title: 'd',
			align: 'right'
		}, {
			field: 'ColorSpace',
			title: 'Color space',
			align: 'left'
		}, {
			field: 'ColorSpaceValue01',
			title: '<var>I<sub>0</sub></var>',
			align: 'left'
		}, {
			field: 'ColorSpaceValue1',
			title: '<var>I<sub>T</sub></var>',
			align: 'left'
		}, {
			field: 'ColorDifference',
			title: 'Δ',
			align: 'left'
		}],
		data: ReadingData,
		toolbar: '#ReadingTableToolbar',
		showColumns: true,
		showToggle: true,
		showColumnsToggleAll: true,
		showFullscreen: true
	});
	$('#ReadingTable').bootstrapTable('filterBy', {
		ColorSpace: ['-','sRGB','CIE-XYZ','CIE-xyY','CIE-L*a*b*','CIE-L*u*v*','CCT','Dominant λ','Nearest color(s)']
	});
	$('#ReadingTableButtonReset').click(function () {
		ResetReadingData();
	});
	function ResetReadingData() {
		for (i = 4; i < 13; i++) {
			ReadingData[i]['ColorSpaceValue1']='';
			ReadingData[i]['ColorSpaceValue01']='';
			ReadingData[i]['ColorDifference']='';
		}
		$('#ReadingTable').bootstrapTable('load', ReadingData);
		SampleXYZ = {};
		SampleLab = {};
		EmptySampleXYZ = {};
		EmptySampleLab = {};
	};
	function ResetTransmissionReadingData() {
		for (i = 4; i < 13; i++) {
			ReadingData[i]['ColorSpaceValue1']='';
			ReadingData[i]['ColorDifference']='';
		}
		$('#ReadingTable').bootstrapTable('load', ReadingData);
		SampleXYZ = {};
		SampleLab = {};
	};
	$('#ProtocolTable').bootstrapTable({
		columns: [{
			field: 'Timestamp',
			title: 'Timestamp',
			sortable: true,
			align: 'left'
		}, {
			field: 'Parameter',
			title: 'Parameter',
			editable: true,
			align: 'left'
		}, {
			field: 'Remark',
			title: 'Remark',
			editable: true,
			align: 'left'
		}, {
			field: 'Light',
			title: 'Light',
			align: 'left'
		}, {
			field: 'Wavelength',
			title: 'λ',
			align: 'right'
		}, {
			field: 'BeamAngle',
			title: '<var>B<sup>o</sup></var>',
			align: 'right'
		}, {
			field: 'Thickness',
			title: 'd',
			align: 'right'
		}, {
			field: 'ColorSpace',
			title: 'Color space',
			align: 'left'
		}, {
			field: 'ColorSpaceValue01',
			title: '<var>I<sub>0</sub></var>',
			align: 'left'
		}, {
			field: 'ColorSpaceValue1',
			title: '<var>I<sub>T</sub></var>',
			align: 'left'
		}, {
			field: 'ColorDifference',
			title: 'Δ',
			align: 'left'
		}],
		data: ProtocolData,
		idField: 'id',
		toolbar: '#ProtocolTableToolbar',
		showColumns: true,
		showToggle: true,
		showColumnsToggleAll: true,
		showFullscreen: true,
		showExport: true,
		treeShowField: 'Timestamp',
		parentIdField: 'pid',
		onPostBody: function() {
			var columns = $('#ProtocolTable').bootstrapTable('getOptions').columns
			if (columns && columns[0][1].visible) {
				$('#ProtocolTable').treegrid({
					initialState: 'collapsed',
					treeColumn: 0,
				})
			}
		}
	});
	$('#ProtocolTableButtonReset').click(function () {
		$('#ProtocolTable').bootstrapTable('removeAll');
	});
	function AppendProtocolData() {
		ProtocolID = ++ProtocolID;
		var ProtocolPID = ProtocolID;
		ProtocolData = [{
				'id': ProtocolPID,
				'pid': 0,
				'Timestamp': new Date().toLocaleString()
		}];
		$('#ProtocolTable').bootstrapTable('append', ProtocolData);
		for (i = 4; i < 13; i++) {
			ProtocolID = ++ProtocolID;
			ProtocolData = [{
					'id': ProtocolID,
					'pid': ProtocolPID,
					'Light': ReadingData[i]['Light'],
					'Wavelength': ReadingData[i]['Wavelength'],
					'BeamAngle': ReadingData[i]['BeamAngle'],
					'Thickness': ReadingData[i]['Thickness'],
					'ColorSpace': ReadingData[i]['ColorSpace'],
					'ColorSpaceReference': ReadingData[i]['ColorSpaceReference'],
					'ColorSpaceValue01': ReadingData[i]['ColorSpaceValue01'],
					'ColorSpaceValue1': ReadingData[i]['ColorSpaceValue1'],
					'ColorDifference': ReadingData[i]['ColorDifference']
			}];
			$('#ProtocolTable').bootstrapTable('append', ProtocolData);
		};
	};
	$('#LogTableButtonBuild').click(function () {
		$('#LogTable').bootstrapTable({
			columns: [{
				field: 'Timestamp',
				title: 'Timestamp',
				sortable: true,
				align: 'left'
			}, {
				field: 'LED',
				title: 'LED',
				align: 'left'
			}, {
				field: 'CIE-XYZ',
				title: 'CIE-XYZ',
				align: 'right'
			}, {
				field: 'CIE-xyY',
				title: 'CIE-xyY',
				align: 'right'
			}, {
				field: 'CIE-L*a*b*',
				title: 'CIE-L*a*b*',
				align: 'right'
			}, {
				field: 'CCT',
				title: 'CCT',
				align: 'right'
			}],
			data: LogData,
			toolbar: '#LogTableToolbar',
			showColumns: true,
			showToggle: true,
			showColumnsToggleAll: true,
			showFullscreen: true,
			showExport: true
		});
	});
	$('#LogTableButtonReset').click(function () {
		$('#LogTable').bootstrapTable('removeAll');
	});
	$('#LogTableButtonDestroy').click(function () {
		$('#LogTable').bootstrapTable('destroy');
	});
	function AppendLogData() {
		LogData = [{
				'Timestamp': new Date().toLocaleString(),
				'LED': $('#switch_4').prop('checked'),
				'CIE-XYZ': SensorData[0]['MeasuredValue'],
				'CIE-xyY': SensorData[1]['MeasuredValue'],
				'CIE-L*a*b*': SensorData[2]['MeasuredValue'],
				'CCT': SensorData[6]['MeasuredValue']
		}];
		$('#LogTable').bootstrapTable('append', LogData);
	};
	$(document).ready(function(){
		$('#SourceWhite').trigger('change');
		$('#RefWhite').trigger('change');
		$('#RGBModel').trigger('change');
		$('#Adaptation').trigger('change');
		$('#ColorScale').trigger('change');
	});
	$('#SourceWhite').change(function() {
		SelectedSourceWhite = parseInt($(this).prop('value'));
		GetRefWhite(SelectedSourceWhite, 'SourceWhite');
	});
	$('#RefWhite').change(function() {
		SelectedRefWhite = parseInt($(this).prop('value'));
		GetRefWhite(SelectedRefWhite, 'RefWhite');
	});
	$('#RGBModel').change(function() {
		SelectedRGBModel = parseInt($(this).prop('value'));
		GetRGBModel(SelectedRGBModel);
	});
	$('#Adaptation').change(function() {
		SelectedAdaptationMethod = parseInt($(this).prop('value'));
		GetAdaptation(SelectedAdaptationMethod);
	});
	$('#ColorScale').change(function() {
		SelectedColorScale = parseInt($(this).prop('value'));
		GetColorScale(SelectedColorScale);
	});
	function UpdateSensorData() {

		SensorXYZ = ChromaticAdaptationXYZ(SensorXYZ);
		SensorxyY = XYZ2xyY(SensorXYZ);
		SensorRGB = XYZ2RGB(SensorXYZ);
		SensorLab = XYZ2Lab(SensorXYZ);
		SensorCCT.Robertson = XYZ2CCT_Robertson(SensorXYZ);
		SensorCCT.McCamy = XYZ2CCT_McCamy(SensorXYZ);

		SensorData[0]['MeasuredValue'] = printObject(ScaleXYZ(SensorXYZ));
		SensorData[1]['MeasuredValue'] = printObject(ScalexyY(SensorxyY));
		SensorData[2]['MeasuredValue'] = printObject(SensorLab);
		SensorData[3]['MeasuredValue'] = printObject(XYZ2Luv(SensorXYZ));
		SensorData[4]['MeasuredValue'] = printObject(XYZ2HunterLab(SensorXYZ));
		SensorData[5]['MeasuredValue'] = printObject(ScaleRGB(SensorRGB));
		SensorData[6]['MeasuredValue'] = printObject(SensorCCT);
		SensorData[7]['MeasuredValue'] = XYZ2DominantWavelength(SensorXYZ);
		SensorData[8]['MeasuredValue'] = printObject(NearestColors(SensorXYZ));

		$('#SensorTable').bootstrapTable('load', SensorData);
		DrawCharts();
	};
	function UpdateReadingData(SampleMode) {

		if (SampleMode == 'EmptySample') {
			EmptySampleXYZ = ChromaticAdaptationXYZ(EmptySampleXYZ);
			EmptySampleLab = XYZ2Lab(EmptySampleXYZ);
			EmptySampleCCT.Robertson = XYZ2CCT_Robertson(SensorXYZ);
			EmptySampleCCT.McCamy = XYZ2CCT_McCamy(SensorXYZ);

			ReadingData[5]['ColorSpaceValue01'] = printObject(ScaleXYZ(EmptySampleXYZ));
			ReadingData[6]['ColorSpaceValue01'] = printObject(ScalexyY(XYZ2xyY(EmptySampleXYZ)));
			ReadingData[7]['ColorSpaceValue01'] = printObject(EmptySampleLab);
			ReadingData[8]['ColorSpaceValue01'] = printObject(XYZ2Luv(EmptySampleXYZ));
			ReadingData[9]['ColorSpaceValue01'] = printObject(ScaleRGB(XYZ2RGB(EmptySampleXYZ)));
			ReadingData[10]['ColorSpaceValue01'] = printObject(EmptySampleCCT);
			ReadingData[11]['ColorSpaceValue01'] = XYZ2DominantWavelength(EmptySampleXYZ);
			ReadingData[12]['ColorSpaceValue01'] = printObject(NearestColors(EmptySampleXYZ));
		}
		if (SampleMode == 'Sample') {
			SampleXYZ = ChromaticAdaptationXYZ(SampleXYZ);
			SampleLab = XYZ2Lab(SampleXYZ);
			SampleCCT.Robertson = XYZ2CCT_Robertson(SensorXYZ);
			SampleCCT.McCamy = XYZ2CCT_McCamy(SensorXYZ);

			ReadingData[5]['ColorSpaceValue1'] = printObject(ScaleXYZ(SampleXYZ));
			ReadingData[6]['ColorSpaceValue1'] = printObject(ScalexyY(XYZ2xyY(SampleXYZ)));
			ReadingData[7]['ColorSpaceValue1'] = printObject(SampleLab);
			ReadingData[8]['ColorSpaceValue1'] = printObject(XYZ2Luv(SampleXYZ));
			ReadingData[9]['ColorSpaceValue1'] = printObject(ScaleRGB(XYZ2RGB(SampleXYZ)));
			ReadingData[10]['ColorSpaceValue1'] = printObject(SampleCCT);
			ReadingData[11]['ColorSpaceValue1'] = XYZ2DominantWavelength(SampleXYZ);
			ReadingData[12]['ColorSpaceValue1'] = printObject(NearestColors(SampleXYZ));
		}
		if (!isEmpty(EmptySampleLab) && !isEmpty(SampleLab)) {
			let Difference_CIELAB = {};
			Difference_CIELAB['<var>CIE1976 ΔE<sup>*</sup><sub>ab</sub></var>'] = DeltaE1976(EmptySampleLab, SampleLab);
			Difference_CIELAB['<var>CIE1994 ΔE<sup>*</sup><sub>94</sub></var>'] = DeltaE1994(EmptySampleLab, SampleLab);
			Difference_CIELAB['<var>CIE2000 ΔE<sup>*</sup><sub>00</sub></var>'] = DeltaE2000(EmptySampleLab, SampleLab);

			ReadingData[7]['ColorDifference']=printObject(Difference_CIELAB);
		}
		$('#ReadingTable').bootstrapTable('load', ReadingData);
	};

	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback();

	function DrawCharts() {

		var sRGBCanvas = document.getElementById("sRGBCanvas");
		var sRGBctx = sRGBCanvas.getContext("2d");
		sRGBctx.fillStyle = SensorRGB.HEX;
		sRGBctx.fillRect(0,0,400,150);

		if (ColorScale.Name == "None") {
			var CIEYxyChartData = new google.visualization.DataTable();
			CIEYxyChartData.addColumn('number', '');
			CIEYxyChartData.addColumn('number', 'Sensor');
			CIEYxyChartData.addColumn('number', 'White Point');
			CIEYxyChartData.addColumn('number', RGBModel.Name);
			CIEYxyChartData.addColumn('number', RGBModel.Name);
			CIEYxyChartData.addColumn('number', 'Planckian locus');
			CIEYxyChartData.addColumn({type:'number', role:'annotation'});
			CIEYxyChartData.addColumn('number', 'Spectrum locus');
			CIEYxyChartData.addColumn({type:'number', role:'annotation'});
			CIEYxyChartData.addRows([
				[SensorxyY.x, SensorxyY.y, null, null, null, null, null, null, null],
				[RefWhite.x, null, RefWhite.y, null, null, null, null, null, null],
				[RGBModel.xr, null, null, RGBModel.yr, null, null, null, null, null],
				[RGBModel.xg, null, null, RGBModel.yg, null, null, null, null, null],
				[RGBModel.xb, null, null, RGBModel.yb, null, null, null, null, null],
				[RGBModel.xb, null, null, null, RGBModel.yb, null, null, null, null],
				[RGBModel.xr, null, null, null, RGBModel.yr, null, null, null, null],
				[0.6528, null, null, null, null, 0.3445, 1000, null, null],
				[0.5857, null, null, null, null, 0.3931, null, null, null],
				[0.5267, null, null, null, null, 0.4133, 2000, null, null],
				[0.4770, null, null, null, null, 0.4137, null, null, null],
				[0.4369, null, null, null, null, 0.4041, 3000, null, null],
				[0.3946, null, null, null, null, 0.3851, null, null, null],
				[0.3608, null, null, null, null, 0.3635, 4500, null, null],
				[0.3324, null, null, null, null, 0.3410, null, null, null],
				[0.3135, null, null, null, null, 0.3236, 6500, null, null],
				[0.2952, null, null, null, null, 0.3048, null, null, null],
				[0.2806, null, null, null, null, 0.2883, 10000, null, null],
				[0.1741, null, null, null, null, null, null, 0.0050, 380],
				[0.1440, null, null, null, null, null, null, 0.0297, 460],
				[0.0913, null, null, null, null, null, null, 0.1327, 480],
				[0.0454, null, null, null, null, null, null, 0.2950, 490],
				[0.0082, null, null, null, null, null, null, 0.5384, 500],
				[0.0139, null, null, null, null, null, null, 0.7502, 510],
				[0.0743, null, null, null, null, null, null, 0.8338, 520],
				[0.1547, null, null, null, null, null, null, 0.8059, 530],
				[0.2296, null, null, null, null, null, null, 0.7543, 540],
				[0.3016, null, null, null, null, null, null, 0.6923, 550],
				[0.3731, null, null, null, null, null, null, 0.6245, 560],
				[0.4441, null, null, null, null, null, null, 0.5547, 570],
				[0.5125, null, null, null, null, null, null, 0.4866, 580],
				[0.5752, null, null, null, null, null, null, 0.4242, 590],
				[0.6270, null, null, null, null, null, null, 0.3725, 600],
				[0.6915, null, null, null, null, null, null, 0.3083, 620],
				[0.7347, null, null, null, null, null, null, 0.2653, 700]
			]);

			let CIEYxyChartOptions = {
				hAxis: {title: 'x', minValue: 0, maxValue: 0.8},
				vAxis: {title: 'y', minValue: 0, maxValue: 0.9},
				width: 533,
				height: 600,
				title: 'CIE-Yxy Chromaticity Diagram (Y=1, '+SensorxyY.Reference+')',
				backgroundColor: 'none',
				annotations: {
					textStyle: {
						fontSize: 11,
						opacity: 0.6
					}
				},
				series: {
					0:{type: 'line', color: 'black', visibleInLegend: true, lineWidth: 0, pointShape: { type: 'star', sides: 5, dent: 0.2 }, pointSize: 18},
					1:{type: 'line', color: 'grey', visibleInLegend: true, lineWidth: 0, pointSize: 6},
					2:{type: 'line', color: 'grey', visibleInLegend: true, lineWidth: 1},
					3:{type: 'line', color: 'grey', visibleInLegend: false}, lineWidth: 1,
					4:{type: 'line', color: 'blue', visibleInLegend: true, curveType: 'function'},
					5:{type: 'line', color: 'black', visibleInLegend: true, curveType: 'function', lineWidth: 0}
				}
			};
			var CIEChart = new google.visualization.LineChart(document.getElementById('CIEChart'));
			CIEChart.draw(CIEYxyChartData, CIEYxyChartOptions);
			// This two lines are the ones that do the magic to load the background image to the proper chart position
			var boundingBox = CIEChart.getChartLayoutInterface().getChartAreaBoundingBox(); 
			$('#CIEChartBackground').css('background-image', "url('"+AssetsPath+"/images/cieYxy.png')").css('background-repeat', 'no-repeat').css('background-position', boundingBox.left + "px " + boundingBox.top + "px").css('background-size', boundingBox.width + "px " + boundingBox.height + "px");
		} else {
				let SensorColor = culori.lab65({
					l: +SensorLab.L,
					a: +SensorLab.a,
					b: +SensorLab.b
				});

			var CIEYxyChartData = new google.visualization.DataTable();
			CIEYxyChartData.addColumn('number', '');
			CIEYxyChartData.addColumn('number', 'Sensor');
			CIEYxyChartData.addColumn({type:'string', role:'tooltip', 'p': {'html': true}});
			CIEYxyChartData.addColumn('number', ColorScale.Name);
			CIEYxyChartData.addColumn({type:'string', role:'tooltip', 'p': {'html': true}});
			CIEYxyChartData.addRows([
				[parseFloat(SensorLab.a), parseFloat(SensorLab.b), '<div style="background-color: ' + culori.formatHex(SensorColor) + ' ;opacity: 100; text-align: left; min-width: 100px; padding: 8px;"><b>Sensor</b><br><br>L: ' + SensorLab.L + '<br>a: ' + SensorLab.a + '<br>b: ' + SensorLab.a + '</div>', null, null],
			]);

			let ReferenceColors = Object.entries(ColorScale.Index).map(entry => {
				let ReferenceName = entry[0];
				let values = entry[1].split(/\s*,\s*/);
				let ReferenceColor = culori.lab65({
					l: +values[0],
					a: +values[1],
					b: +values[2]
				});
				CIEYxyChartData.addRows([
					[parseFloat(ReferenceColor.a), null, null, parseFloat(ReferenceColor.b), '<div style="background-color: ' + culori.formatHex(ReferenceColor) + ';opacity: 100; text-align: left; min-width: 100px; padding: 8px;"><b>' + ReferenceName + '</b><br><br>L: ' + ReferenceColor.l + '<br>a: ' + ReferenceColor.a + '<br>b: ' + ReferenceColor.b + '</div>'],
					]);
			});

			let CIEYxyChartOptions = {
				hAxis: {title: 'a', minValue: -150.0, maxValue: 150.0},
				vAxis: {title: 'b', minValue: -150.0, maxValue: 150.0},
				width: 900,
				height: 900,
				title: 'CIE-L*a*b* Chromaticity Diagram (L=75, '+SensorLab.Reference+')',
				backgroundColor: 'none',
				annotations: {
					textStyle: {
						fontSize: 11,
						opacity: 0.6
					}
				},
				tooltip: { isHtml: true },
				series: {
					0:{type: 'line', color: 'black', visibleInLegend: true, lineWidth: 0, pointShape: { type: 'star', sides: 5, dent: 0.2 }, pointSize: 18},
					1:{type: 'line', color: 'grey', visibleInLegend: true, lineWidth: ColorScale.LineWidth, curveType: ColorScale.CurveType, pointSize: 3}
				}
			};
			var CIEChart = new google.visualization.LineChart(document.getElementById('CIEChart'));
			CIEChart.draw(CIEYxyChartData, CIEYxyChartOptions);
			// This two lines are the ones that do the magic to load the background image to the proper chart position
			var boundingBox = CIEChart.getChartLayoutInterface().getChartAreaBoundingBox(); 
			$('#CIEChartBackground').css('background-image', "url('"+AssetsPath+"/images/cieLab.png')").css('background-repeat', 'no-repeat').css('background-position', boundingBox.left + "px " + boundingBox.top + "px").css('background-size', boundingBox.width + "px " + boundingBox.height + "px");
		}
	}

	function NearestColors(Color) {

		if (ColorScale.Name == "None") {
			return({Note: 'No color scale selected'});
		} else if (Color.Reference != ColorScale.Reference) {
			return({Note: 'Reference White mismatch'});
		}

		let xyz65 = {
			mode: "xyz65",
			x: Color.X,
			y: Color.Y,
			z: Color.Z
		}

		let ReferenceColors = Object.entries(ColorScale.Index).map(entry => {
			let ReferenceName = entry[0];
			let values = entry[1].split(/\s*,\s*/);
			let ReferenceColor = culori.lab65({
				l: +values[0],
				a: +values[1],
				b: +values[2]
			});
			let Distance = culori.differenceCie76()(xyz65, ReferenceColor);
			return {
				ReferenceName,
				ReferenceColor,
				Distance
			};
		});
		let nearestReferenceColors = culori.nearest(ReferenceColors, culori.differenceCie76(), item => item.ReferenceColor);
		return(nearestReferenceColors(xyz65, 3).map(item => item.ReferenceName + ' (<var>CIE1976 ΔE<sup>*</sup><sub>ab</sub>:</var> ' + item.Distance.toFixed(4) +')'));
	}

	function ScaleXYZ({Source, Reference, Adaptation, X, Y, Z}) {
		var Scale = ($('#ScaleXYZ').prop('checked') == false) ? 1.0 : 100.0;
		var Digits = ($('#ScaleXYZ').prop('checked') == false) ? 6 : 4;

		if ($('#ScaleXYZ').prop('checked')===true) {
			SensorData[0]['ScaledValue']='<input id="ScaleXYZ" type="checkbox" checked="checked">';
		} else {
			SensorData[0]['ScaledValue']='<input id="ScaleXYZ" type="checkbox">';
		}
		let res = {
			X: (Scale * X).toFixed(Digits),
			Y: (Scale * Y).toFixed(Digits),
			Z: (Scale * Z).toFixed(Digits),
			Source: Source,
			Reference: Reference,
			Adaptation: Adaptation,
			Scale: Scale
		}
		return res;
	}

	function ScalexyY({Source, Reference, Adaptation, x, y, Y}) {
		var Scale = ($('#ScalexyY').prop('checked') == false) ? 1.0 : 100.0;
		var Digits = ($('#ScalexyY').prop('checked') == false) ? 6 : 4;

		if ($('#ScalexyY').prop('checked')===true) {
			SensorData[1]['ScaledValue']='<input id="ScalexyY" type="checkbox" checked="checked">';
		} else {
			SensorData[1]['ScaledValue']='<input id="ScalexyY" type="checkbox">';
		}

		let res = {
			x: (x).toFixed(6),
			y: (y).toFixed(6),
			Y: (Scale * Y).toFixed(Digits),
			Source: Source,
			Reference: Reference,
			Adaptation: Adaptation,
			Scale: Scale
		}
		return res;
	}

	function ScaleRGB({Model, Source, Reference, Adaptation, Gamma, HEX, R, G, B}) {
		var Scale = ($('#ScaleRGB').prop('checked') == false) ? 1.0 : 255.0;
		var Digits = ($('#ScaleRGB').prop('checked') == false) ? 6 : 4;

		if ($('#ScaleRGB').prop('checked')===true) {
			SensorData[5]['ScaledValue']='<input id="ScaleRGB" type="checkbox" checked="checked">';
		} else {
			SensorData[5]['ScaledValue']='<input id="ScaleRGB" type="checkbox">';
		}

		let res = {
			R: (Scale * R).toFixed(Digits),
			G: (Scale * G).toFixed(Digits),
			B: (Scale * B).toFixed(Digits),
			HEX: HEX,
			Model: Model,
			Source: Source,
			Reference: Reference,
			Adaptation: Adaptation,
			Gamma: Gamma,
			Scale: Scale
		}
		return res;
	}

	function printObject(obj) {
		var result = '';
		var objValue;
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				objValue=`${obj[i]}`;
//				var x = parseFloat(objValue).toFixed(4); 
//				if (isNaN(x)) {
//				var x;
//			} else {
//				objValue=x;
//			}
				result += `${i}`+': '+objValue+'</br>';
			}
		}
		return result;
	}

	window.onbeforeunload = function() {
		return "Dude, are you sure you want to leave? Think of the kittens!";
	}

	function isEmpty(obj) {
		return Object.keys(obj).length === 0;
	}

	jQuery.event.special.mousewheel = {
		setup: function( _, ns, handle ) {
			this.addEventListener('mousewheel', handle, { passive: !ns.includes('noPreventDefault') });
		}
	};
});
