var VersionNumber='0.0.1';
var VersionDate='2020-12-29';
var Repository='smartSpectroMeter';
var RepositoryPath='https://github.com/smartaquametering/smartPhotometer';
var Owner='smartAquaMetering';
var OwnerPath='https://github.com/smartaquametering';
var Copyright='Copyright © 2020-2021'
var CopyrightPath='https://github.com/smartaquametering/smartPhotometer/blob/main/LICENSE';
var Release=Repository+' - '+VersionNumber+' ('+VersionDate+')';

var AssetsPath='https://smartaquametering.github.io/assets/';
var ImagesPath=AssetsPath+'images/';

var SelectedBeamAngle;
var SelectedCuvetteThickness;
var SelectedSourceWhite;
var SelectedRefWhite;
var SelectedAdaptationMethod;
var SelectedRGBModel;
var SelectedColorScale;
var SelectedCharts = [];
var SelectedScaling = [];

function ToggleState(state) {
	for (i = 7; i < 36; i++) {
		var switchid = "#switch_" + i;
		$(switchid).bootstrapToggle(state);
		$(switchid+"_slider").slider();
	}
	$("#FadeLEDs").bootstrapToggle(state);
};

jQuery.event.special.mousewheel = {
	setup: function( _, ns, handle ) {
		this.addEventListener('mousewheel', handle, { passive: !ns.includes('noPreventDefault') });
	}
};

window.onbeforeunload = function() {
	return "Dude, are you sure you want to leave? Think of the kittens!";
}

function DocumentOnLoad() {

	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback();

	var swaction=0;
	var ProtocolID=0;
	var ProtocolData=[];
	var LogData=[];
	var LedData=new Array();
		LedData[0]=new Array();
			LedData[0]['Manufacturer']='';
			LedData[0]['ProductID']='';
			LedData[0]['DeviceType']='Halogen lamp';
			LedData[0]['Color']='Warm White';
			LedData[0]['CCT']='6500';
			LedData[0]['XYZ']='';
			LedData[0]['DominantWavelength']='410-780';
			LedData[0]['FWHMBandwidth']='';
			LedData[0]['GPIO']='0';
			LedData[0]['PCFGPIO']='';
		LedData[1]=new Array();
			LedData[1]['Manufacturer']='';
			LedData[1]['ProductID']='';
			LedData[1]['DeviceType']='LED';
			LedData[1]['Color']='';
			LedData[1]['CCT']='';
			LedData[1]['XYZ']='';
			LedData[1]['DominantWavelength']='';
			LedData[1]['FWHMBandwidth']='';
			LedData[1]['GPIO']='1';
			LedData[1]['PCFGPIO']='';
		LedData[2]=new Array();
			LedData[2]['Manufacturer']='';
			LedData[2]['ProductID']='';
			LedData[2]['DeviceType']='LED';
			LedData[2]['Color']='';
			LedData[2]['CCT']='';
			LedData[2]['XYZ']='';
			LedData[2]['DominantWavelength']='';
			LedData[2]['FWHMBandwidth']='';
			LedData[2]['GPIO']='2';
			LedData[2]['PCFGPIO']='';
		LedData[3]=new Array();
			LedData[3]['Manufacturer']='';
			LedData[3]['ProductID']='';
			LedData[3]['DeviceType']='LED';
			LedData[3]['Color']='';
			LedData[3]['CCT']='';
			LedData[3]['XYZ']='';
			LedData[3]['DominantWavelength']='';
			LedData[3]['FWHMBandwidth']='';
			LedData[3]['GPIO']='3';
			LedData[3]['PCFGPIO']='';
		LedData[4]=new Array();
			LedData[4]['Manufacturer']='';
			LedData[4]['ProductID']='';
			LedData[4]['DeviceType']='LED';
			LedData[4]['Color']='';
			LedData[4]['CCT']='';
			LedData[4]['XYZ']='';
			LedData[4]['DominantWavelength']='';
			LedData[4]['FWHMBandwidth']='';
			LedData[4]['GPIO']='4';
			LedData[4]['PCFGPIO']='';
		LedData[5]=new Array();
			LedData[5]['Manufacturer']='';
			LedData[5]['ProductID']='';
			LedData[5]['DeviceType']='LED';
			LedData[5]['Color']='';
			LedData[5]['CCT']='';
			LedData[5]['XYZ']='';
			LedData[5]['DominantWavelength']='';
			LedData[5]['FWHMBandwidth']='';
			LedData[5]['GPIO']='5';
			LedData[5]['PCFGPIO']='';
		LedData[6]=new Array();
			LedData[6]['Manufacturer']='';
			LedData[6]['ProductID']='';
			LedData[6]['DeviceType']='LED';
			LedData[6]['Color']='';
			LedData[6]['CCT']='';
			LedData[6]['XYZ']='';
			LedData[6]['DominantWavelength']='';
			LedData[6]['FWHMBandwidth']='';
			LedData[6]['GPIO']='6';
			LedData[6]['PCFGPIO']='';
		LedData[7]=new Array();
			LedData[7]['Manufacturer']='';
			LedData[7]['ProductID']='';
			LedData[7]['DeviceType']='LED';
			LedData[7]['Color']='';
			LedData[7]['CCT']='';
			LedData[7]['XYZ']='';
			LedData[7]['DominantWavelength']='';
			LedData[7]['FWHMBandwidth']='';
			LedData[7]['GPIO']='7';
			LedData[7]['PCFGPIO']='';
		LedData[8]=new Array();
			LedData[8]['Manufacturer']='';
			LedData[8]['ProductID']='';
			LedData[8]['DeviceType']='LED';
			LedData[8]['Color']='';
			LedData[8]['CCT']='';
			LedData[8]['XYZ']='';
			LedData[8]['DominantWavelength']='';
			LedData[8]['FWHMBandwidth']='';
			LedData[8]['GPIO']='8';
			LedData[8]['PCFGPIO']='';
		LedData[9]=new Array();
			LedData[9]['Manufacturer']='';
			LedData[9]['ProductID']='';
			LedData[9]['DeviceType']='LED';
			LedData[9]['Color']='';
			LedData[9]['CCT']='';
			LedData[9]['XYZ']='';
			LedData[9]['DominantWavelength']='';
			LedData[9]['FWHMBandwidth']='';
			LedData[9]['GPIO']='9';
			LedData[9]['PCFGPIO']='';
		LedData[10]=new Array();
			LedData[10]['Manufacturer']='';
			LedData[10]['ProductID']='';
			LedData[10]['DeviceType']='LED';
			LedData[10]['Color']='';
			LedData[10]['CCT']='';
			LedData[10]['XYZ']='';
			LedData[10]['DominantWavelength']='';
			LedData[10]['FWHMBandwidth']='';
			LedData[10]['GPIO']='10';
			LedData[10]['PCFGPIO']='';
		LedData[11]=new Array();
			LedData[11]['Manufacturer']='';
			LedData[11]['ProductID']='';
			LedData[11]['DeviceType']='LED';
			LedData[11]['Color']='';
			LedData[11]['CCT']='';
			LedData[11]['XYZ']='';
			LedData[11]['DominantWavelength']='';
			LedData[11]['FWHMBandwidth']='';
			LedData[11]['GPIO']='11';
			LedData[11]['PCFGPIO']='';
		LedData[12]=new Array();
			LedData[12]['Manufacturer']='';
			LedData[12]['ProductID']='';
			LedData[12]['DeviceType']='LED';
			LedData[12]['Color']='';
			LedData[12]['CCT']='';
			LedData[12]['XYZ']='';
			LedData[12]['DominantWavelength']='';
			LedData[12]['FWHMBandwidth']='';
			LedData[12]['GPIO']='12';
			LedData[12]['PCFGPIO']='';
		LedData[13]=new Array();
			LedData[13]['Manufacturer']='';
			LedData[13]['ProductID']='';
			LedData[13]['DeviceType']='LED';
			LedData[13]['Color']='';
			LedData[13]['CCT']='';
			LedData[13]['XYZ']='';
			LedData[13]['DominantWavelength']='';
			LedData[13]['FWHMBandwidth']='';
			LedData[13]['GPIO']='13';
			LedData[13]['PCFGPIO']='';
		LedData[14]=new Array();
			LedData[14]['Manufacturer']='';
			LedData[14]['ProductID']='';
			LedData[14]['DeviceType']='LED';
			LedData[14]['Color']='';
			LedData[14]['CCT']='';
			LedData[14]['XYZ']='';
			LedData[14]['DominantWavelength']='';
			LedData[14]['FWHMBandwidth']='';
			LedData[14]['GPIO']='14';
			LedData[14]['PCFGPIO']='';
		LedData[15]=new Array();
			LedData[15]['Manufacturer']='';
			LedData[15]['ProductID']='';
			LedData[15]['DeviceType']='LED';
			LedData[15]['Color']='';
			LedData[15]['CCT']='';
			LedData[15]['XYZ']='';
			LedData[15]['DominantWavelength']='';
			LedData[15]['FWHMBandwidth']='';
			LedData[15]['GPIO']='15';
			LedData[15]['PCFGPIO']='';
		LedData[16]=new Array();
			LedData[16]['Manufacturer']='';
			LedData[16]['ProductID']='';
			LedData[16]['DeviceType']='LED';
			LedData[16]['Color']='';
			LedData[16]['CCT']='';
			LedData[16]['XYZ']='';
			LedData[16]['DominantWavelength']='';
			LedData[16]['FWHMBandwidth']='';
			LedData[16]['GPIO']='16';
			LedData[16]['PCFGPIO']='';
		LedData[17]=new Array();
			LedData[17]['Manufacturer']='';
			LedData[17]['ProductID']='';
			LedData[17]['DeviceType']='LED';
			LedData[17]['Color']='';
			LedData[17]['CCT']='';
			LedData[17]['XYZ']='';
			LedData[17]['DominantWavelength']='';
			LedData[17]['FWHMBandwidth']='';
			LedData[17]['GPIO']='17';
			LedData[17]['PCFGPIO']='';
		LedData[18]=new Array();
			LedData[18]['Manufacturer']='';
			LedData[18]['ProductID']='';
			LedData[18]['DeviceType']='LED';
			LedData[18]['Color']='';
			LedData[18]['CCT']='';
			LedData[18]['XYZ']='';
			LedData[18]['DominantWavelength']='';
			LedData[18]['FWHMBandwidth']='';
			LedData[18]['GPIO']='18';
			LedData[18]['PCFGPIO']='';
		LedData[19]=new Array();
			LedData[19]['Manufacturer']='';
			LedData[19]['ProductID']='';
			LedData[19]['DeviceType']='LED';
			LedData[19]['Color']='';
			LedData[19]['CCT']='';
			LedData[19]['XYZ']='';
			LedData[19]['DominantWavelength']='';
			LedData[19]['FWHMBandwidth']='';
			LedData[19]['GPIO']='19';
			LedData[19]['PCFGPIO']='';
		LedData[20]=new Array();
			LedData[20]['Manufacturer']='';
			LedData[20]['ProductID']='';
			LedData[20]['DeviceType']='LED';
			LedData[20]['Color']='';
			LedData[20]['CCT']='';
			LedData[20]['XYZ']='';
			LedData[20]['DominantWavelength']='';
			LedData[20]['FWHMBandwidth']='';
			LedData[20]['GPIO']='20';
			LedData[20]['PCFGPIO']='';
		LedData[21]=new Array();
			LedData[21]['Manufacturer']='';
			LedData[21]['ProductID']='';
			LedData[21]['DeviceType']='LED';
			LedData[21]['Color']='';
			LedData[21]['CCT']='';
			LedData[21]['XYZ']='';
			LedData[21]['DominantWavelength']='';
			LedData[21]['FWHMBandwidth']='';
			LedData[21]['GPIO']='21';
			LedData[21]['PCFGPIO']='';
		LedData[22]=new Array();
			LedData[22]['Manufacturer']='';
			LedData[22]['ProductID']='';
			LedData[22]['DeviceType']='LED';
			LedData[22]['Color']='';
			LedData[22]['CCT']='';
			LedData[22]['XYZ']='';
			LedData[22]['DominantWavelength']='';
			LedData[22]['FWHMBandwidth']='';
			LedData[22]['GPIO']='22';
			LedData[22]['PCFGPIO']='';
		LedData[23]=new Array();
			LedData[23]['Manufacturer']='';
			LedData[23]['ProductID']='';
			LedData[23]['DeviceType']='LED';
			LedData[23]['Color']='';
			LedData[23]['CCT']='';
			LedData[23]['XYZ']='';
			LedData[23]['DominantWavelength']='';
			LedData[23]['FWHMBandwidth']='';
			LedData[23]['GPIO']='23';
			LedData[23]['PCFGPIO']='';
		LedData[24]=new Array();
			LedData[24]['Manufacturer']='';
			LedData[24]['ProductID']='';
			LedData[24]['DeviceType']='LED';
			LedData[24]['Color']='';
			LedData[24]['CCT']='';
			LedData[24]['XYZ']='';
			LedData[24]['DominantWavelength']='';
			LedData[24]['FWHMBandwidth']='';
			LedData[24]['GPIO']='24';
			LedData[24]['PCFGPIO']='';
		LedData[25]=new Array();
			LedData[25]['Manufacturer']='';
			LedData[25]['ProductID']='';
			LedData[25]['DeviceType']='LED';
			LedData[25]['Color']='';
			LedData[25]['CCT']='';
			LedData[25]['XYZ']='';
			LedData[25]['DominantWavelength']='';
			LedData[25]['FWHMBandwidth']='';
			LedData[25]['GPIO']='25';
			LedData[25]['PCFGPIO']='';
		LedData[26]=new Array();
			LedData[26]['Manufacturer']='';
			LedData[26]['ProductID']='';
			LedData[26]['DeviceType']='LED';
			LedData[26]['Color']='';
			LedData[26]['CCT']='';
			LedData[26]['XYZ']='';
			LedData[26]['DominantWavelength']='';
			LedData[26]['FWHMBandwidth']='';
			LedData[26]['GPIO']='26';
			LedData[26]['PCFGPIO']='';
		LedData[27]=new Array();
			LedData[27]['Manufacturer']='';
			LedData[27]['ProductID']='';
			LedData[27]['DeviceType']='LED';
			LedData[27]['Color']='';
			LedData[27]['CCT']='';
			LedData[27]['XYZ']='';
			LedData[27]['DominantWavelength']='';
			LedData[27]['FWHMBandwidth']='';
			LedData[27]['GPIO']='27';
			LedData[27]['PCFGPIO']='';
		LedData[28]=new Array();
			LedData[28]['Manufacturer']='';
			LedData[28]['ProductID']='';
			LedData[28]['DeviceType']='LED';
			LedData[28]['Color']='';
			LedData[28]['CCT']='';
			LedData[28]['XYZ']='';
			LedData[28]['DominantWavelength']='';
			LedData[28]['FWHMBandwidth']='';
			LedData[28]['GPIO']='28';
			LedData[28]['PCFGPIO']='';
		LedData[29]=new Array();
			LedData[29]['Manufacturer']='';
			LedData[29]['ProductID']='';
			LedData[29]['DeviceType']='LED';
			LedData[29]['Color']='';
			LedData[29]['CCT']='';
			LedData[29]['XYZ']='';
			LedData[29]['DominantWavelength']='';
			LedData[29]['FWHMBandwidth']='';
			LedData[29]['GPIO']='29';
			LedData[29]['PCFGPIO']='';
		LedData[30]=new Array();
			LedData[30]['Manufacturer']='';
			LedData[30]['ProductID']='';
			LedData[30]['DeviceType']='LED';
			LedData[30]['Color']='';
			LedData[30]['CCT']='';
			LedData[30]['XYZ']='';
			LedData[30]['DominantWavelength']='';
			LedData[30]['FWHMBandwidth']='';
			LedData[30]['GPIO']='30';
			LedData[30]['PCFGPIO']='';
		LedData[31]=new Array();
			LedData[31]['Manufacturer']='';
			LedData[31]['ProductID']='';
			LedData[31]['DeviceType']='LED';
			LedData[31]['Color']='';
			LedData[31]['CCT']='';
			LedData[31]['XYZ']='';
			LedData[31]['DominantWavelength']='';
			LedData[31]['FWHMBandwidth']='';
			LedData[31]['GPIO']='31';
			LedData[31]['PCFGPIO']='';
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
			ReadingData[4]['Readings']='<var>I<sub>λ</sub></var>';
			ReadingData[4]['ValueReference']='';
			ReadingData[4]['ValueSample']='';
			ReadingData[4]['ValueSpectrum']='';
			ReadingData[4]['Light']='Warm White';
			ReadingData[4]['LightWavelength']='410-780';
			ReadingData[4]['GPIO']='12';
			ReadingData[4]['BeamAngle']='180';
			ReadingData[4]['Thickness']='1.0';
			ReadingData[4]['Filter01Wavelength']='615';
			ReadingData[4]['Filter01HalfWidth']='25';
			ReadingData[4]['Filter02Wavelength']='525';
			ReadingData[4]['Filter02HalfWidth']='35';
			ReadingData[4]['Filter03Wavelength']='465';
			ReadingData[4]['Filter03HalfWidth']='15';
		ReadingData[5]=new Array();
			ReadingData[5]['Readings']='<var>T<sub>λ</sub></var>';
			ReadingData[5]['ValueReference']='';
			ReadingData[5]['ValueSample']='';
			ReadingData[5]['ValueSpectrum']='';
		ReadingData[6]=new Array();
			ReadingData[6]['Readings']='<var>E<sub>λ</sub></var>';
			ReadingData[6]['ValueReference']='';
			ReadingData[6]['ValueSample']='';
			ReadingData[6]['ValueSpectrum']='';
		ReadingData[7]=new Array();
			ReadingData[7]['Readings']='<var>SAC<sub>λ</sub></var>';
			ReadingData[7]['ValueReference']='';
			ReadingData[7]['ValueSample']='';
			ReadingData[7]['ValueSpectrum']='';
		ReadingData[8]=new Array();
			ReadingData[8]['Readings']='CIE-XYZ';
			ReadingData[8]['ValueReference']='';
			ReadingData[8]['ValueSample']='';
			ReadingData[8]['ValueSpectrum']='';
		ReadingData[9]=new Array();
			ReadingData[9]['Readings']='CIE-xyY';
			ReadingData[9]['ValueReference']='';
			ReadingData[9]['ValueSample']='';
			ReadingData[9]['ValueSpectrum']='';
		ReadingData[10]=new Array();
			ReadingData[10]['Readings']='CIE-L*a*b*';
			ReadingData[10]['ValueReference']='';
			ReadingData[10]['ValueSample']='';
			ReadingData[10]['ValueSpectrum']='';
			ReadingData[10]['ColorDifference']='';
		ReadingData[11]=new Array();
			ReadingData[11]['Readings']='CIE-L*u*v*';
			ReadingData[11]['ValueReference']='';
			ReadingData[11]['ValueSample']='';
			ReadingData[11]['ValueSpectrum']='';
			ReadingData[11]['ColorDifference']='';
		ReadingData[12]=new Array();
			ReadingData[12]['Readings']='Hunter-Lab';
			ReadingData[12]['ValueReference']='';
			ReadingData[12]['ValueSample']='';
			ReadingData[12]['ValueSpectrum']='';
			ReadingData[12]['ColorDifference']='';
		ReadingData[13]=new Array();
			ReadingData[13]['Readings']='RGB';
			ReadingData[13]['ValueReference']='';
			ReadingData[13]['ValueSample']='';
			ReadingData[13]['ValueSpectrum']='';
			ReadingData[13]['ColorDifference']='';
		ReadingData[14]=new Array();
			ReadingData[14]['Readings']='CCT';
			ReadingData[14]['ValueReference']='';
			ReadingData[14]['ValueSample']='';
			ReadingData[14]['ValueSpectrum']='';
		ReadingData[15]=new Array();
			ReadingData[15]['Readings']='Dominant λ';
			ReadingData[15]['ValueReference']='';
			ReadingData[15]['ValueSample']='';
			ReadingData[15]['ValueSpectrum']='';
		ReadingData[16]=new Array();
			ReadingData[16]['Readings']='Nearest color(s)';
			ReadingData[16]['ValueReference']='';
			ReadingData[16]['ValueSample']='';
			ReadingData[16]['ValueSpectrum']='';
	var SensorData=new Array();
		SensorData[0]=new Array();
			SensorData[0]['Parameter']='<b><var>I<sub>λ</sub></var></b>';
			SensorData[0]['MeasuredValue']='';
		SensorData[1]=new Array();
			SensorData[1]['Parameter']='<b>CIE-XYZ</b>';
			SensorData[1]['MeasuredValue']='';
		SensorData[2]=new Array();
			SensorData[2]['Parameter']='<b>CIE-xyY</b>';
			SensorData[2]['MeasuredValue']='';
		SensorData[3]=new Array();
			SensorData[3]['Parameter']='<b>CIE-L*a*b*</b>';
			SensorData[3]['MeasuredValue']='';
		SensorData[4]=new Array();
			SensorData[4]['Parameter']='<b>CIE-L*u*v*</b>';
			SensorData[4]['MeasuredValue']='';
		SensorData[5]=new Array();
			SensorData[5]['Parameter']='<b>Hunter-Lab</b>';
			SensorData[5]['MeasuredValue']='';
		SensorData[6]=new Array();
			SensorData[6]['Parameter']='<b>RGB</b>';
			SensorData[6]['MeasuredValue']='';
		SensorData[7]=new Array();
			SensorData[7]['Parameter']='<b>CCT</b> [K]';
			SensorData[7]['MeasuredValue']='';
		SensorData[8]=new Array();
			SensorData[8]['Parameter']='<b>Dominant λ</b> [nm]';
			SensorData[8]['MeasuredValue']='';
		SensorData[9]=new Array();
			SensorData[9]['Parameter']='<b>Nearest color(s)</b>';
			SensorData[9]['MeasuredValue']='';

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

	var AbsorbanceSpectrum = document.getElementById('AbsorbanceSpectrum');
	var CIEColor = document.getElementById('CIEColor');
	var RGBColorHeading = document.getElementById('RGBColorHeading');
	var RGBColor = document.getElementById('RGBColor');
	RGBColor.width = 0;
	RGBColor.height = 0;

	var SensorXYZ = {};
	var SensorLightIntensity = {};
	var SensorxyY = {};
	var SensorRGB = {};
	var SensorLab = { L: 100, a: 0, b: 0 };

	var SensorCCT = {};

	var EmptySampleXYZ = {};
	var EmptySampleLightIntensity = {};
	var EmptySampleLab = {};
	var EmptySampleCCT = {};

	var SampleXYZ = {};
	var SampleLightIntensity = {};
	var SampleTransmission = {};
	var SamplexyY = {};
	var SampleRGB = {};
	var SampleAbsorbance = {};
	var SampleSAC = {};
	var SampleLab = {};
	var SampleCCT = {};

	var SpectrumXYZ = {};
	var SpectrumLightIntensity = {};
	var SpectrumTransmission = {};
	var SpectrumxyY = {};
	var SpectrumRGB = {};
	var SpectrumAbsorbance = {};
	var SpectrumSAC = {};
	var SpectrumLab = {};
	var SpectrumCCT = {};

	$('#BeamAngle').change(function() {
		SelectedBeamAngle = parseInt($(this).prop('value'));
		ReadingData[4]['BeamAngle'] = GetBeamAngle(SelectedBeamAngle);
		UpdateReadingData('EmptySample');
		UpdateReadingData('Sample');
	});
	$('#CuvetteThickness').change(function() {
		SelectedCuvetteThickness = parseInt($(this).prop('value'));
		ReadingData[4]['Thickness'] = GetCuvetteThickness(SelectedCuvetteThickness);
		UpdateReadingData('EmptySample');
		UpdateReadingData('Sample');
	});
	$('#SourceWhite').change(function() {
		SelectedSourceWhite = parseInt($(this).prop('value'));
		GetRefWhite(SelectedSourceWhite, 'SourceWhite');
		UpdateReadingData('EmptySample');
		UpdateReadingData('Sample');
	});
	$('#ColorScale').change(function() {
		SelectedColorScale = parseInt($(this).prop('value'));
		UpdateReadingData('EmptySample');
		UpdateReadingData('Sample');
	});
	$('#Charts').change(function() {
		SelectedCharts = $(this).val();
		DrawCharts(SampleLightIntensity, SpectrumLightIntensity, SampleTransmission, SpectrumTransmission, SampleAbsorbance, SpectrumAbsorbance, SampleRGB, SamplexyY, SampleLab);
	});
	$('#RefWhite').change(function() {
		SelectedRefWhite = parseInt($(this).prop('value'));
		GetRefWhite(SelectedRefWhite, 'RefWhite');
		UpdateReadingData('EmptySample');
		UpdateReadingData('Sample');
	});
	$('#Adaptation').change(function() {
		SelectedAdaptationMethod = parseInt($(this).prop('value'));
		GetAdaptation(SelectedAdaptationMethod);
		UpdateReadingData('EmptySample');
		UpdateReadingData('Sample');
	});
	$('#RGBModel').change(function() {
		SelectedRGBModel = parseInt($(this).prop('value'));
		GetRGBModel(SelectedRGBModel);
		UpdateReadingData('EmptySample');
		UpdateReadingData('Sample');
	});
	$('#Scaling').change(function() {
		SelectedScaling = $(this).val();
		UpdateReadingData('EmptySample');
		UpdateReadingData('Sample');
	});

	$('#SpectrumLightIntensityImport').change(function(e) {
		if (e.target.files.length === 0) {
			console.log('No file selected.');
			return;
		}
		if (e.target.files.length) {
			$(this).next('.custom-file-label').html(e.target.files[0].name);
		}
		const reader = new FileReader();
		reader.onload = function fileReadCompleted() {
			SpectrumLightIntensity = {};
			var allLines = this.result.split(/\r\n|\n/);
			allLines.forEach((line) => {
			var strParts = line.split(",");
				if (strParts[0] && strParts[1]) {
//					strParts[0] = parseFloat(strParts[0].trim()).toFixed(1);
					strParts[0] = Math.round(strParts[0].trim());
					strParts[1] = parseFloat(strParts[1].trim()).toFixed(6);
					SpectrumLightIntensity[strParts[0]] = strParts[1];
				}
			});
			UpdateReadingData('Spectrum');
		};
		reader.readAsText(e.target.files[0]);
	});

	$('#SpectrumTransmissionImport').change(function(e) {
		if (e.target.files.length === 0) {
			console.log('No file selected.');
			return;
		}
		if (e.target.files.length) {
			$(this).next('.custom-file-label').html(e.target.files[0].name);
		}
		const reader = new FileReader();
		reader.onload = function fileReadCompleted() {
			SpectrumTransmission = {};
			var allLines = this.result.split(/\r\n|\n/);
			allLines.forEach((line) => {
			var strParts = line.split(",");
				if (strParts[0] && strParts[1]) {
//					strParts[0] = parseFloat(strParts[0].trim()).toFixed(1);
					strParts[0] = Math.round(strParts[0].trim());
					strParts[1] = (parseFloat(strParts[1].trim()) / 100).toFixed(6);
					SpectrumTransmission[strParts[0]] = strParts[1];
				}
			});
			UpdateReadingData('Spectrum');
		};
		reader.readAsText(e.target.files[0]);
	});

	function trigger() {
		ToggleState('enable');
		$('select').selectpicker();

		SelectedSourceWhite = parseInt($('#SourceWhite').prop('value'));
		GetRefWhite(SelectedSourceWhite, 'SourceWhite');

		SelectedRefWhite = parseInt($('#RefWhite').prop('value'));
		GetRefWhite(SelectedRefWhite, 'RefWhite');

		SelectedAdaptationMethod = parseInt($('#Adaptation').prop('value'));
		GetAdaptation(SelectedAdaptationMethod);

		SelectedRGBModel = parseInt($('#RGBModel').prop('value'));
		GetRGBModel(SelectedRGBModel);

		SelectedColorScale = parseInt($('#ColorScale').prop('value'));
		SelectedCharts = $('#Charts').val();

		$('#Scaling').trigger('change');
	};

	trigger();

	$('#FadeLEDs').change(function() {
		if ($(this).prop('checked')===true) {
			$("#LEDArray").fadeOut();
		} else {
			$("#LEDArray").fadeIn();
		}
	});

	// Empty Sample
	$('#switch_7').change(function() {
		if ($(this).prop('checked')===true) {
			swaction = 1;
			$.get('./control?cmd=GPIO,'+ReadingData[2]['GPIO']+',1');
			ToggleState('disable');
			ResetReadingData();
		} else {
			ToggleState('enable');
			UpdateReadingData('EmptySample');
		}
	});
	// Sample
	$('#switch_8').change(function() {
		if ($(this).prop('checked')===true) {
			swaction = 1;
			$.get('./control?cmd=GPIO,'+ReadingData[3]['GPIO']+',1');
			ToggleState('disable');
			ResetTransmissionReadingData();
		} else {
			ToggleState('enable');
			UpdateReadingData('Sample');
			AppendProtocolData();
		}
	});

	function LedSwitch(SwitchID,GPIO) {
		var state;
		swaction = 1;

		if ($("#"+SwitchID).prop('checked')===true) {
			$("#"+SwitchID+"_slider").slider("enable");
			var SliderValue = $("#"+SwitchID+"_slider").slider('getValue');

console.log(SwitchID,GPIO,SliderValue);

			$.get('./control?cmd=pcapwm,'+GPIO+','+SliderValue, function(data, status) {
console.log("test");
console.log(${data});
console.log(${status});
			});

			state = 1;
		} else {
			$("#"+SwitchID+"_slider").slider("disable");
			$.get('./control?cmd=pcapwm,'+GPIO+',0', function(data, status) {
console.log("2. row", ${data}, ${status});
			});
			state = 0;
		}
	return(state);
	};

	// LED Array
	$('#switch_9').change(function() {LedSwitch($(this).prop('id'),LedData[0]['GPIO'])});
	$('#switch_10').change(function() {LedSwitch($(this).prop('id'),LedData[1]['GPIO'])});
	$('#switch_11').change(function() {LedSwitch($(this).prop('id'),LedData[2]['GPIO'])});
	$('#switch_12').change(function() {LedSwitch($(this).prop('id'),LedData[3]['GPIO'])});
	$('#switch_13').change(function() {LedSwitch($(this).prop('id'),LedData[4]['GPIO'])});
	$('#switch_14').change(function() {LedSwitch($(this).prop('id'),LedData[5]['GPIO'])});
	$('#switch_15').change(function() {LedSwitch($(this).prop('id'),LedData[6]['GPIO'])});
	$('#switch_16').change(function() {LedSwitch($(this).prop('id'),LedData[7]['GPIO'])});
	$('#switch_17').change(function() {LedSwitch($(this).prop('id'),LedData[8]['GPIO'])});
	$('#switch_18').change(function() {LedSwitch($(this).prop('id'),LedData[9]['GPIO'])});
	$('#switch_19').change(function() {LedSwitch($(this).prop('id'),LedData[10]['GPIO'])});
	$('#switch_20').change(function() {LedSwitch($(this).prop('id'),LedData[11]['GPIO'])});
	$('#switch_21').change(function() {LedSwitch($(this).prop('id'),LedData[12]['GPIO'])});
	$('#switch_22').change(function() {LedSwitch($(this).prop('id'),LedData[13]['GPIO'])});
	$('#switch_23').change(function() {LedSwitch($(this).prop('id'),LedData[14]['GPIO'])});
	$('#switch_24').change(function() {LedSwitch($(this).prop('id'),LedData[15]['GPIO'])});
	$('#switch_25').change(function() {LedSwitch($(this).prop('id'),LedData[16]['GPIO'])});
	$('#switch_26').change(function() {LedSwitch($(this).prop('id'),LedData[17]['GPIO'])});
	$('#switch_27').change(function() {LedSwitch($(this).prop('id'),LedData[18]['GPIO'])});
	$('#switch_28').change(function() {LedSwitch($(this).prop('id'),LedData[19]['GPIO'])});
	$('#switch_29').change(function() {LedSwitch($(this).prop('id'),LedData[20]['GPIO'])});
	$('#switch_30').change(function() {LedSwitch($(this).prop('id'),LedData[21]['GPIO'])});
	$('#switch_31').change(function() {LedSwitch($(this).prop('id'),LedData[22]['GPIO'])});
	$('#switch_32').change(function() {LedSwitch($(this).prop('id'),LedData[23]['GPIO'])});
	$('#switch_33').change(function() {LedSwitch($(this).prop('id'),LedData[24]['GPIO'])});
	$('#switch_34').change(function() {LedSwitch($(this).prop('id'),LedData[25]['GPIO'])});
	$('#switch_35').change(function() {LedSwitch($(this).prop('id'),LedData[26]['GPIO'])});
	$('#switch_36').change(function() {LedSwitch($(this).prop('id'),LedData[27]['GPIO'])});
	$('#switch_37').change(function() {LedSwitch($(this).prop('id'),LedData[28]['GPIO'])});
	$('#switch_38').change(function() {LedSwitch($(this).prop('id'),LedData[29]['GPIO'])});
	$('#switch_39').change(function() {LedSwitch($(this).prop('id'),LedData[30]['GPIO'])});
	$('#switch_40').change(function() {LedSwitch($(this).prop('id'),LedData[31]['GPIO'])});

	$("#switch_9_slider").on("slideStop", function() {LedSwitch('switch_9',LedData[0]['GPIO'])});
	$("#switch_10_slider").on("slideStop", function() {LedSwitch('switch_10',LedData[1]['GPIO'])});
	$("#switch_11_slider").on("slideStop", function() {LedSwitch('switch_11',LedData[2]['GPIO'])});
	$("#switch_12_slider").on("slideStop", function() {LedSwitch('switch_12',LedData[3]['GPIO'])});
	$("#switch_13_slider").on("slideStop", function() {LedSwitch('switch_13',LedData[4]['GPIO'])});
	$("#switch_14_slider").on("slideStop", function() {LedSwitch('switch_14',LedData[5]['GPIO'])});
	$("#switch_15_slider").on("slideStop", function() {LedSwitch('switch_15',LedData[6]['GPIO'])});
	$("#switch_16_slider").on("slideStop", function() {LedSwitch('switch_16',LedData[7]['GPIO'])});
	$("#switch_17_slider").on("slideStop", function() {LedSwitch('switch_17',LedData[8]['GPIO'])});
	$("#switch_18_slider").on("slideStop", function() {LedSwitch('switch_18',LedData[9]['GPIO'])});
	$("#switch_19_slider").on("slideStop", function() {LedSwitch('switch_19',LedData[10]['GPIO'])});
	$("#switch_20_slider").on("slideStop", function() {LedSwitch('switch_20',LedData[11]['GPIO'])});
	$("#switch_21_slider").on("slideStop", function() {LedSwitch('switch_21',LedData[12]['GPIO'])});
	$("#switch_22_slider").on("slideStop", function() {LedSwitch('switch_22',LedData[13]['GPIO'])});
	$("#switch_23_slider").on("slideStop", function() {LedSwitch('switch_23',LedData[14]['GPIO'])});
	$("#switch_24_slider").on("slideStop", function() {LedSwitch('switch_24',LedData[15]['GPIO'])});
	$("#switch_25_slider").on("slideStop", function() {LedSwitch('switch_25',LedData[16]['GPIO'])});
	$("#switch_26_slider").on("slideStop", function() {LedSwitch('switch_26',LedData[17]['GPIO'])});
	$("#switch_27_slider").on("slideStop", function() {LedSwitch('switch_27',LedData[18]['GPIO'])});
	$("#switch_28_slider").on("slideStop", function() {LedSwitch('switch_28',LedData[19]['GPIO'])});
	$("#switch_29_slider").on("slideStop", function() {LedSwitch('switch_29',LedData[20]['GPIO'])});
	$("#switch_30_slider").on("slideStop", function() {LedSwitch('switch_30',LedData[21]['GPIO'])});
	$("#switch_31_slider").on("slideStop", function() {LedSwitch('switch_31',LedData[22]['GPIO'])});
	$("#switch_32_slider").on("slideStop", function() {LedSwitch('switch_32',LedData[23]['GPIO'])});
	$("#switch_33_slider").on("slideStop", function() {LedSwitch('switch_33',LedData[24]['GPIO'])});
	$("#switch_34_slider").on("slideStop", function() {LedSwitch('switch_34',LedData[13]['GPIO'])});
	$("#switch_35_slider").on("slideStop", function() {LedSwitch('switch_35',LedData[14]['GPIO'])});
	$("#switch_36_slider").on("slideStop", function() {LedSwitch('switch_36',LedData[15]['GPIO'])});
	$("#switch_37_slider").on("slideStop", function() {LedSwitch('switch_37',LedData[16]['GPIO'])});
	$("#switch_38_slider").on("slideStop", function() {LedSwitch('switch_38',LedData[17]['GPIO'])});
	$("#switch_39_slider").on("slideStop", function() {LedSwitch('switch_39',LedData[18]['GPIO'])});
	$("#switch_40_slider").on("slideStop", function() {LedSwitch('switch_40',LedData[19]['GPIO'])});

	$('#SensorTable').bootstrapTable('destroy').bootstrapTable({
		columns: [{
			field: 'Parameter',
			title: 'Sensor'
		}, {
			field: 'MeasuredValue',
			title: 'Readings'
		}],
		data: SensorData
	});
	$('#ReadingTable').bootstrapTable('destroy').bootstrapTable({
		columns: [{
			field: 'Light',
			title: 'Light',
			align: 'left'
		}, {
			field: 'LightWavelength',
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
			field: 'Readings',
			title: 'Readings',
			align: 'left'
		}, {
			field: 'ValueReference',
			title: '<var>I<sub>0</sub></var>',
			align: 'left'
		}, {
			field: 'ValueSample',
			title: '<var>I<sub>T</sub></var>',
			align: 'left'
		}, {
			field: 'ValueSpectrum',
			title: '<var>I<sub>Spectrum</sub></var>',
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
		Readings: ['<var>I<sub>λ</sub></var>','<var>T<sub>λ</sub></var>','<var>E<sub>λ</sub></var>','<var>SAC<sub>λ</sub></var>','CIE-XYZ','CIE-xyY','CIE-L*a*b*','CIE-L*u*v*','Hunter-Lab','RGB','CCT','Dominant λ','Nearest color(s)']
	});
	$('#ReadingTableButtonReset').click(function () {
		ResetReadingData();
	});
	function ResetReadingData() {
		for (i = 4; i < 17; i++) {
			ReadingData[i]['ValueReference']='';
			ReadingData[i]['ValueSample']='';
			ReadingData[i]['ColorDifference']='';
		}
		$('#ReadingTable').bootstrapTable('load', ReadingData);
		SampleLightIntensity = {};
		SampleTransmission = {};
		SampleAbsorbance = {};
		SampleSAC = {};
		SampleXYZ = {};
		SampleLab = {};
		EmptySampleLightIntensity = {};
		EmptySampleTransmission = {};
		EmptySampleAbsorbance = {};
		EmptySampleSAC = {};
		EmptySampleXYZ = {};
		EmptySampleLab = {};
	};
	function ResetTransmissionReadingData() {
		for (i = 4; i < 17; i++) {
			ReadingData[i]['ValueSample']='';
			ReadingData[i]['ColorDifference']='';
		}
		$('#ReadingTable').bootstrapTable('load', ReadingData);
		SampleLightIntensity = {};
		SampleTransmission = {};
		SampleAbsorbance = {};
		SampleSAC = {};
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
			field: 'LightWavelength',
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
			field: 'Readings',
			title: 'Readings',
			align: 'left'
		}, {
			field: 'ValueReference',
			title: '<var>I<sub>0</sub></var>',
			align: 'left'
		}, {
			field: 'ValueSample',
			title: '<var>I<sub>T</sub></var>',
			align: 'left'
		}, {
			field: 'ValueSpectrum',
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
		for (i = 4; i < 17; i++) {
			ProtocolID = ++ProtocolID;
			ProtocolData = [{
					'id': ProtocolID,
					'pid': ProtocolPID,
					'Light': ReadingData[i]['Light'],
					'LightWavelength': ReadingData[i]['LightWavelength'],
					'BeamAngle': ReadingData[i]['BeamAngle'],
					'Thickness': ReadingData[i]['Thickness'],
					'Readings': ReadingData[i]['Readings'],
					'ReadingsReference': ReadingData[i]['ReadingsReference'],
					'ValueReference': ReadingData[i]['ValueReference'],
					'ValueSample': ReadingData[i]['ValueSample'],
					'ValueSpectrum': ReadingData[i]['ValueSpectrum'],
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
				field: 'Intensity',
				title: '<var>I<sub>λ</sub></var>',
				align: 'right'
			}, {
				field: 'CIE-XYZ',
				title: 'CIE-XYZ',
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
				'LED': $('#switch_6').prop('checked'),
				'Intensity': SensorData[0]['MeasuredValue'],
				'CIE-XYZ': SensorData[1]['MeasuredValue'],
				'CIE-L*a*b*': SensorData[3]['MeasuredValue'],
				'CCT': SensorData[7]['MeasuredValue']
		}];
		$('#LogTable').bootstrapTable('append', LogData);
	};
	function UpdateSensorData() {
//		SensorXYZ = ChromaticAdaptationXYZ(SensorXYZ);
//		SensorxyY = XYZ2xyY(SensorXYZ);
//		SensorRGB = XYZ2RGB(SensorXYZ);
//		SensorLab = XYZ2Lab(SensorXYZ);
//		SensorCCT.Robertson = XYZ2CCT_Robertson(SensorXYZ);
//		SensorCCT.McCamy = XYZ2CCT_McCamy(SensorXYZ);
//		SensorData[0]['MeasuredValue'] = printObject(SensorLightIntensity);
//		SensorData[1]['MeasuredValue'] = printObject(ScaleXYZ(SensorXYZ));
//		SensorData[2]['MeasuredValue'] = printObject(ScalexyY(SensorxyY));
//		SensorData[3]['MeasuredValue'] = printObject(SensorLab);
//		SensorData[4]['MeasuredValue'] = printObject(XYZ2Luv(SensorXYZ));
//		SensorData[5]['MeasuredValue'] = printObject(XYZ2HunterLab(SensorXYZ));
//		SensorData[6]['MeasuredValue'] = printObject(ScaleRGB(SensorRGB));
//		SensorData[7]['MeasuredValue'] = printObject(SensorCCT);
//		SensorData[8]['MeasuredValue'] = XYZ2DominantWavelength(SensorXYZ);
//		SensorData[9]['MeasuredValue'] = printObject(NearestColors(SensorXYZ));

		$('#SensorTable').bootstrapTable('load', SensorData);
//		DrawCharts(SampleAbsorbance, SpectrumAbsorbance, SensorRGB, SensorxyY, SensorLab);
	};
	function UpdateReadingData(SampleMode) {

		if (SampleMode == 'EmptySample') {
			EmptySampleTransmission = LightIntensity2Transmission(EmptySampleLightIntensity, EmptySampleLightIntensity);
			EmptySampleAbsorbance = Transmission2Absorbance(EmptySampleTransmission);
			EmptySampleSAC = Absorbance2SAC(EmptySampleAbsorbance, ReadingData[4]['Thickness']);
			EmptySampleXYZ = Transmission2XYZ(EmptySampleTransmission);
			EmptySampleXYZ = ChromaticAdaptationXYZ(EmptySampleXYZ);
			EmptySamplexyY = XYZ2xyY(EmptySampleXYZ);
			EmptySampleRGB = XYZ2RGB(EmptySampleXYZ);
			EmptySampleLab = XYZ2Lab(EmptySampleXYZ);
			EmptySampleCCT.Robertson = XYZ2CCT_Robertson(EmptySampleXYZ);
			EmptySampleCCT.McCamy = XYZ2CCT_McCamy(EmptySampleXYZ);

			ReadingData[4]['ValueReference'] = printObject(EmptySampleLightIntensity);
			ReadingData[5]['ValueReference'] = printObject(EmptySampleTransmission);
			ReadingData[6]['ValueReference'] = printObject(EmptySampleAbsorbance);
			ReadingData[7]['ValueReference'] = printObject(EmptySampleSAC);
			ReadingData[8]['ValueReference'] = printObject(ScaleXYZ(EmptySampleXYZ, SelectedScaling));
			ReadingData[9]['ValueReference'] = printObject(ScalexyY(EmptySamplexyY, SelectedScaling));
			ReadingData[10]['ValueReference'] = printObject(EmptySampleLab);
			ReadingData[11]['ValueReference'] = printObject(XYZ2Luv(EmptySampleXYZ));
			ReadingData[12]['ValueReference'] = printObject(XYZ2HunterLab(EmptySampleXYZ));
			ReadingData[13]['ValueReference'] = printObject(ScaleRGB(EmptySampleRGB, SelectedScaling));
			ReadingData[14]['ValueReference'] = printObject(EmptySampleCCT);
			ReadingData[15]['ValueReference'] = XYZ2DominantWavelength(EmptySampleXYZ);
			ReadingData[16]['ValueReference'] = printObject(NearestColors(EmptySampleXYZ, EmptySampleLab, SelectedColorScale));

			DrawCharts(EmptySampleLightIntensity, SpectrumLightIntensity, EmptySampleTransmission, SpectrumTransmission, EmptySampleAbsorbance, SpectrumAbsorbance, EmptySampleRGB, EmptySamplexyY, EmptySampleLab);
		}
		if (SampleMode == 'Sample') {
			SampleLightIntensity = Randomize(SampleLightIntensity);
			SampleTransmission = LightIntensity2Transmission(EmptySampleLightIntensity, SampleLightIntensity);
			SampleAbsorbance = Transmission2Absorbance(SampleTransmission);
			SampleSAC = Absorbance2SAC(SampleAbsorbance, ReadingData[4]['Thickness']);
			SampleXYZ = Transmission2XYZ(SampleTransmission);
			SampleXYZ = ChromaticAdaptationXYZ(SampleXYZ);
			SamplexyY = XYZ2xyY(SampleXYZ);
			SampleRGB = XYZ2RGB(SampleXYZ);
			SampleLab = XYZ2Lab(SampleXYZ);
			SampleCCT.Robertson = XYZ2CCT_Robertson(SampleXYZ);
			SampleCCT.McCamy = XYZ2CCT_McCamy(SampleXYZ);

			ReadingData[4]['ValueSample'] = printObject(SampleLightIntensity);
			ReadingData[5]['ValueSample'] = printObject(SampleTransmission);
			ReadingData[6]['ValueSample'] = printObject(SampleAbsorbance);
			ReadingData[7]['ValueSample'] = printObject(SampleSAC);
			ReadingData[8]['ValueSample'] = printObject(ScaleXYZ(SampleXYZ, SelectedScaling));
			ReadingData[9]['ValueSample'] = printObject(ScalexyY(SamplexyY, SelectedScaling));
			ReadingData[10]['ValueSample'] = printObject(SampleLab);
			ReadingData[11]['ValueSample'] = printObject(XYZ2Luv(SampleXYZ));
			ReadingData[12]['ValueSample'] = printObject(XYZ2HunterLab(SampleXYZ));
			ReadingData[13]['ValueSample'] = printObject(ScaleRGB(SampleRGB, SelectedScaling));
			ReadingData[14]['ValueSample'] = printObject(SampleCCT);
			ReadingData[15]['ValueSample'] = XYZ2DominantWavelength(SampleXYZ);
			ReadingData[16]['ValueSample'] = printObject(NearestColors(SampleXYZ, SampleLab, SelectedColorScale));

			DrawCharts(SampleLightIntensity, SpectrumLightIntensity, SampleTransmission, SpectrumTransmission, SampleAbsorbance, SpectrumAbsorbance, SampleRGB, SamplexyY, SampleLab);
		}
		if (SampleMode == 'Spectrum') {
			SpectrumAbsorbance = Transmission2Absorbance(SpectrumTransmission);
			SpectrumSAC = Absorbance2SAC(SpectrumAbsorbance, ReadingData[4]['Thickness']);
			SpectrumXYZ = Transmission2XYZ(SpectrumTransmission);
			SpectrumXYZ = ChromaticAdaptationXYZ(SpectrumXYZ);
			SpectrumxyY = XYZ2xyY(SpectrumXYZ);
			SpectrumRGB = XYZ2RGB(SpectrumXYZ);
			SpectrumLab = XYZ2Lab(SpectrumXYZ);
			SpectrumCCT.Robertson = XYZ2CCT_Robertson(SpectrumXYZ);
			SpectrumCCT.McCamy = XYZ2CCT_McCamy(SpectrumXYZ);

			ReadingData[4]['ValueSpectrum'] = "";
			ReadingData[5]['ValueSpectrum'] = printObject(SpectrumTransmission);
			ReadingData[6]['ValueSpectrum'] = printObject(SpectrumAbsorbance);
			ReadingData[7]['ValueSpectrum'] = printObject(SpectrumSAC);
			ReadingData[8]['ValueSpectrum'] = printObject(ScaleXYZ(SpectrumXYZ, SelectedScaling));
			ReadingData[9]['ValueSpectrum'] = printObject(ScalexyY(SpectrumxyY, SelectedScaling));
			ReadingData[10]['ValueSpectrum'] = printObject(SpectrumLab);
			ReadingData[11]['ValueSpectrum'] = printObject(XYZ2Luv(SpectrumXYZ));
			ReadingData[12]['ValueSpectrum'] = printObject(XYZ2HunterLab(SpectrumXYZ));
			ReadingData[13]['ValueSpectrum'] = printObject(ScaleRGB(SpectrumRGB, SelectedScaling));
			ReadingData[14]['ValueSpectrum'] = printObject(SpectrumCCT);
			ReadingData[15]['ValueSpectrum'] = XYZ2DominantWavelength(SpectrumXYZ);
			ReadingData[16]['ValueSpectrum'] = printObject(NearestColors(SpectrumXYZ, SpectrumLab, SelectedColorScale));

			DrawCharts(SampleLightIntensity, SpectrumLightIntensity, SampleTransmission, SpectrumTransmission, SampleAbsorbance, SpectrumAbsorbance, SpectrumRGB, SpectrumxyY, SpectrumLab);
		}

		if (!isEmpty(EmptySampleLab) && !isEmpty(SampleLab)) {
			let Difference_CIELAB = {};
			Difference_CIELAB['<var>CIE1976 ΔE<sup>*</sup><sub>ab</sub></var>'] = DeltaE1976(EmptySampleLab, SampleLab);
			Difference_CIELAB['<var>CIE1994 ΔE<sup>*</sup><sub>94</sub></var>'] = DeltaE1994(EmptySampleLab, SampleLab);
			Difference_CIELAB['<var>CIE2000 ΔE<sup>*</sup><sub>00</sub></var>'] = DeltaE2000(EmptySampleLab, SampleLab);

			ReadingData[10]['ColorDifference']=printObject(Difference_CIELAB);
		}
		$('#ReadingTable').bootstrapTable('load', ReadingData);
	};

	function DrawCharts(SampleLightIntensity, SpectrumLightIntensity, SampleTransmission, SpectrumTransmission, SampleAbsorbance, SpectrumAbsorbance, RGB, xyY, Lab) {
		var SourceSPD = window[SourceWhite.SPD];
		var RefSPD = window[RefWhite.SPD];

		if (SelectedCharts.includes('1') && !isEmpty(SampleLightIntensity)) {
			var SPDChartData = new google.visualization.DataTable();
			SPDChartData.addColumn('number', '');
			SPDChartData.addColumn('number', 'Sample');
			SPDChartData.addColumn('number', 'Import');
			SPDChartData.addColumn('number', 'Light Source');
			SPDChartData.addColumn('number', 'Light Reference');
			for (var i in SampleLightIntensity) {
				if (SampleLightIntensity.hasOwnProperty(i)) {
					SPDChartData.addRows([
						[parseFloat(i), parseFloat(SampleLightIntensity[i]), null, null, null],
						]);
				}
			}
			for (var i in SpectrumLightIntensity) {
				if (SpectrumLightIntensity.hasOwnProperty(i)) {
					SPDChartData.addRows([
						[parseFloat(i), null, parseFloat(SpectrumLightIntensity[i]), null, null],
						]);
				}
			}
			for (var i in SourceSPD) {
				if (SourceSPD.hasOwnProperty(i)) {
					SPDChartData.addRows([
						[parseFloat(i), null, null, parseFloat(SourceSPD[i]), null],
						]);
				}
			}
			for (var i in RefSPD) {
				if (RefSPD.hasOwnProperty(i)) {
					SPDChartData.addRows([
						[parseFloat(i), null, null, null, parseFloat(RefSPD[i])],
						]);
				}
			}
			let SPDChartOptions = {
//				hAxis: {title: 'λ [nm]', minValue: 200, maxValue: 1200},
				hAxis: {title: 'λ [nm]'},
				vAxes: {
//					0: {title: 'Absolute Intensity [35 counts / μW/cm2]', viewWindow: {min: 0}, maxValue: 1.2},
					0: {title: 'Absolute Intensity [35 counts / μW/cm2]', viewWindow: {min: 0}},
					1: {title: 'Relative Intensity [%]', viewWindow: {min: 0}, gridlines: {color: 'transparent'}}
				},
				width: 1200,
				height: 800,
				title: 'Spectral Power Distribution',
				backgroundColor: 'none',
				annotations: {
					textStyle: {
						fontSize: 11,
						opacity: 0.6
					}
				},
				tooltip: { isHtml: true },
				series: {
					0:{targetAxisIndex: 0, type: 'line', color: 'grey', visibleInLegend: true, lineWidth: 2, curveType: 'function', pointSize: 3},
					1:{targetAxisIndex: 1, type: 'line', color: 'blue', visibleInLegend: true, lineWidth: 1, curveType: 'none'},
					2:{targetAxisIndex: 1, type: 'line', color: 'yellow', visibleInLegend: true, lineWidth: 1, curveType: 'function'},
					3:{targetAxisIndex: 1, type: 'line', color: 'orange', visibleInLegend: true, lineWidth: 1, curveType: 'function'}
				}
			};

			var SPDChart = new google.visualization.LineChart(LightIntensitySpectrum);
			SPDChart.draw(SPDChartData, SPDChartOptions);
			// This two lines are the ones that do the magic to load the background image to the proper chart position
			var boundingBox = SPDChart.getChartLayoutInterface().getChartAreaBoundingBox(); 
			$('#LightIntensitySpectrumBackground').css('background-image', "url('"+AssetsPath+"/images/Spectrum.png')").css('background-repeat', 'no-repeat').css('background-position', boundingBox.left + "px " + boundingBox.top + "px").css('background-size', boundingBox.width + "px " + boundingBox.height + "px");
		} else {
			LightIntensitySpectrum.innerHTML = "";
		}

		if (SelectedCharts.includes('2') && !isEmpty(SampleTransmission)) {
			var TransmissionChartData = new google.visualization.DataTable();
			TransmissionChartData.addColumn('number', '');
			TransmissionChartData.addColumn('number', 'Sample');
			TransmissionChartData.addColumn('number', 'Import');
			for (var i in SampleTransmission) {
				if (SampleTransmission.hasOwnProperty(i)) {
					TransmissionChartData.addRows([
						[parseFloat(i), parseFloat(SampleTransmission[i]), null],
						]);
				}
			}
			for (var i in SpectrumTransmission) {
				if (SpectrumTransmission.hasOwnProperty(i)) {
					TransmissionChartData.addRows([
						[parseFloat(i), null, parseFloat(SpectrumTransmission[i])],
						]);
				}
			}
			let TransmissionChartOptions = {
//				hAxis: {title: 'λ [nm]', minValue: 200, maxValue: 1200},
				hAxis: {title: 'λ [nm]'},
				vAxes: {
//					0: {title: 'T', viewWindow: {min: 0}, maxValue: 1.2},
					0: {title: 'T', viewWindow: {min: 0}}
				},
				width: 1200,
				height: 800,
				title: 'Spectral Transmission',
				backgroundColor: 'none',
				annotations: {
					textStyle: {
						fontSize: 11,
						opacity: 0.6
					}
				},
				tooltip: { isHtml: true },
				series: {
					0:{targetAxisIndex: 0, type: 'line', color: 'grey', visibleInLegend: true, lineWidth: 2, curveType: 'function', pointSize: 3},
					1:{targetAxisIndex: 0, type: 'line', color: 'blue', visibleInLegend: true, lineWidth: 1, curveType: 'none'}
				}
			};

			var TransmissionChart = new google.visualization.LineChart(TransmissionSpectrum);
			TransmissionChart.draw(TransmissionChartData, TransmissionChartOptions);
			// This two lines are the ones that do the magic to load the background image to the proper chart position
			var boundingBox = TransmissionChart.getChartLayoutInterface().getChartAreaBoundingBox(); 
			$('#TransmissionSpectrumBackground').css('background-image', "url('"+AssetsPath+"/images/Spectrum.png')").css('background-repeat', 'no-repeat').css('background-position', boundingBox.left + "px " + boundingBox.top + "px").css('background-size', boundingBox.width + "px " + boundingBox.height + "px");
		} else {
			TransmissionSpectrum.innerHTML = "";
		}

		if (SelectedCharts.includes('3') && !isEmpty(SampleAbsorbance)) {
			var AbsorbanceChartData = new google.visualization.DataTable();
			AbsorbanceChartData.addColumn('number', '');
			AbsorbanceChartData.addColumn('number', 'Sample');
			AbsorbanceChartData.addColumn('number', 'Import');
			for (var i in SampleAbsorbance) {
				if (SampleAbsorbance.hasOwnProperty(i)) {
					AbsorbanceChartData.addRows([
						[parseFloat(i), parseFloat(SampleAbsorbance[i]), null],
						]);
				}
			}
			for (var i in SpectrumAbsorbance) {
				if (SpectrumAbsorbance.hasOwnProperty(i)) {
					AbsorbanceChartData.addRows([
						[parseFloat(i), null, parseFloat(SpectrumAbsorbance[i])],
						]);
				}
			}
			let AbsorbanceChartOptions = {
//				hAxis: {title: 'λ [nm]', minValue: 200, maxValue: 1200},
				hAxis: {title: 'λ [nm]'},
				vAxes: {
//					0: {title: 'E', viewWindow: {min: 0}, maxValue: 1.2},
					0: {title: 'E', viewWindow: {min: 0}}
				},
				width: 1200,
				height: 800,
				title: 'Spectral Absorbance',
				backgroundColor: 'none',
				annotations: {
					textStyle: {
						fontSize: 11,
						opacity: 0.6
					}
				},
				tooltip: { isHtml: true },
				series: {
					0:{targetAxisIndex: 0, type: 'line', color: 'grey', visibleInLegend: true, lineWidth: 2, curveType: 'function', pointSize: 3},
					1:{targetAxisIndex: 0, type: 'line', color: 'blue', visibleInLegend: true, lineWidth: 1, curveType: 'none'}
				}
			};

			var AbsorbanceChart = new google.visualization.LineChart(AbsorbanceSpectrum);
			AbsorbanceChart.draw(AbsorbanceChartData, AbsorbanceChartOptions);
			// This two lines are the ones that do the magic to load the background image to the proper chart position
			var boundingBox = AbsorbanceChart.getChartLayoutInterface().getChartAreaBoundingBox(); 
			$('#AbsorbanceSpectrumBackground').css('background-image', "url('"+AssetsPath+"/images/Spectrum.png')").css('background-repeat', 'no-repeat').css('background-position', boundingBox.left + "px " + boundingBox.top + "px").css('background-size', boundingBox.width + "px " + boundingBox.height + "px");
		} else {
			AbsorbanceSpectrum.innerHTML = "";
		}

		if (SelectedCharts.includes('4') && !isEmpty(xyY) && !isEmpty(Lab)) {
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
					[xyY.x, xyY.y,, null, null, null, null, null, null],
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
					title: 'CIE-Yxy Chromaticity Diagram (Y=1, '+xyY.Reference+')',
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
				var CIEChart = new google.visualization.LineChart(CIEColor);
				CIEChart.draw(CIEYxyChartData, CIEYxyChartOptions);
				// This two lines are the ones that do the magic to load the background image to the proper chart position
				var boundingBox = CIEChart.getChartLayoutInterface().getChartAreaBoundingBox(); 
				$('#CIEColorBackground').css('background-image', "url('"+AssetsPath+"/images/CIE-Yxy.png')").css('background-repeat', 'no-repeat').css('background-position', boundingBox.left + "px " + boundingBox.top + "px").css('background-size', boundingBox.width + "px " + boundingBox.height + "px");
			} else {
				var CIEYxyChartData = new google.visualization.DataTable();
				CIEYxyChartData.addColumn('number', '');
				CIEYxyChartData.addColumn('number', 'Sensor');
				CIEYxyChartData.addColumn({type:'string', role:'tooltip', 'p': {'html': true}});
				CIEYxyChartData.addColumn('number', ColorScale.Name);
				CIEYxyChartData.addColumn({type:'string', role:'tooltip', 'p': {'html': true}});

				if (!ColorScale.Value) {
					CIEYxyChartData.addRows([
						[parseFloat(Lab.a), parseFloat(Lab.b), '<div style="background-color: ' + RGB.HEX + ' ;opacity: 100; text-align: left; min-width: 100px; padding: 8px;"><b>Sensor</b><br><br>L: ' + Lab.L + '<br>a: ' + Lab.a + '<br>b: ' + Lab.b + '</div>', null, null],
					]);
				} else {
					CIEYxyChartData.addRows([
						[parseFloat(Lab.a), parseFloat(Lab.b), '<div style="background-color: ' + RGB.HEX + ' ;opacity: 100; text-align: left; min-width: 100px; padding: 8px;"><b>Sensor</b><br><br>L: ' + Lab.L + '<br>a: ' + Lab.a + '<br>b: ' + Lab.b + '<br><br>' + ColorScale.Name + ': ' + ColorScale.Value + '</div>', null, null],
					]);
				}
				let ReferenceColors = Object.entries(ColorScale.Index).map(entry => {
					let ReferenceName = entry[0];
					let values = entry[1].split(/\s*,\s*/);
					let ReferenceColor = {
						L: parseFloat(values[0]),
						a: parseFloat(values[1]),
						b: parseFloat(values[2])
					};
					let ReferenceColorXYZ = Lab2XYZ(ReferenceColor);
					let ReferenceColorRGB = XYZ2RGB(ReferenceColorXYZ);

					CIEYxyChartData.addRows([
						[parseFloat(ReferenceColor.a), null, null, parseFloat(ReferenceColor.b), '<div style="background-color: ' + ReferenceColorRGB.HEX + ';opacity: 100; text-align: left; min-width: 100px; padding: 8px;"><b>' + ReferenceName + '</b><br><br>L: ' + ReferenceColor.L + '<br>a: ' + ReferenceColor.a + '<br>b: ' + ReferenceColor.b + '</div>'],
						]);
				});

				let CIEYxyChartOptions = {
					hAxis: {title: 'a', minValue: -150.0, maxValue: 150.0},
					vAxis: {title: 'b', minValue: -150.0, maxValue: 150.0},
					width: 900,
					height: 900,
					title: 'CIE-L*a*b* Chromaticity Diagram (L=75, '+Lab.Reference+')',
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
						1:{type: 'line', color: 'grey', visibleInLegend: true, lineWidth: ColorScale.ChartLineWidth, curveType: ColorScale.ChartCurveType, pointSize: 3}
					}
				};
				var CIEChart = new google.visualization.LineChart(CIEColor);
				CIEChart.draw(CIEYxyChartData, CIEYxyChartOptions);
				// This two lines are the ones that do the magic to load the background image to the proper chart position
				var boundingBox = CIEChart.getChartLayoutInterface().getChartAreaBoundingBox(); 
				$('#CIEColorBackground').css('background-image', "url('"+ImagesPath+ColorScale.ChartBackground+"')").css('background-repeat', 'no-repeat').css('background-position', boundingBox.left + "px " + boundingBox.top + "px").css('background-size', boundingBox.width + "px " + boundingBox.height + "px");
			}
		} else {
			CIEColor.innerHTML = "";
		}

		if (SelectedCharts.includes('5') && !isEmpty(RGB)) {
			RGBColorHeading.innerHTML = RGB.Model+'('+(RGB.R).toFixed(6)+', '+(RGB.G).toFixed(6)+', '+(RGB.B).toFixed(6)+') ('+RGB.Reference+')';
			RGBColor.width = 400;
			RGBColor.height = 150;
			var RGBContext = RGBColor.getContext('2d');
			RGBContext.globalCompositeOperation = "destination-over";
			RGBContext.fillStyle = RGB.HEX;
			RGBContext.fillRect(0, 0, RGBColor.width, RGBColor.height);
			RGBContext.globalCompositeOperation = "source-over";
			RGBContext.lineWidth = 1;
			RGBContext.strokeStyle = "#d3d3d3";
			RGBContext.strokeRect(0, 0, RGBColor.width, RGBColor.height);
		} else {
			RGBColorHeading.innerHTML = "";
			RGBColor.innerHTML = "";
			RGBColor.width = 0;
			RGBColor.height = 0;
		}
	}

	function Randomize(obj) {
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				obj[i] = obj[i] * Math.random();
			}
		}
		return(obj);
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
		return(result);
	}

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
										if(s.Sensors[a].TaskNumber<8){
											decimalsValue=s.Sensors[a].TaskValues[l].NrDecimals;
											tempValue=parseFloat(tempValue).toFixed(decimalsValue);
											if (s.Sensors[a].TaskNumber==1) {
//												SensorData[(s.Sensors[a].TaskValues[l].ValueNumber-1)]['MeasuredValue']=tempValue;
												if (s.Sensors[a].TaskValues[l].ValueNumber==1) {
													SensorXYZ.X = parseFloat(tempValue/100);
												} else if (s.Sensors[a].TaskValues[l].ValueNumber==2) {
													SensorXYZ.Y = parseFloat(tempValue/100);
												} else if (s.Sensors[a].TaskValues[l].ValueNumber==3) {
													SensorXYZ.Z = parseFloat(tempValue/100);
												} else if (s.Sensors[a].TaskValues[l].ValueNumber==4) {
													SensorCCT.Sensor = parseFloat(tempValue);
												}
											} else if (s.Sensors[a].TaskNumber==2) {
//												SensorData[(s.Sensors[a].TaskValues[l].ValueNumber-1)]['MeasuredValue']=tempValue;
												if (s.Sensors[a].TaskValues[l].ValueNumber==1) {
													SensorXYZ.X = parseFloat(tempValue/100);
												} else if (s.Sensors[a].TaskValues[l].ValueNumber==2) {
													SensorXYZ.Y = parseFloat(tempValue/100);
												} else if (s.Sensors[a].TaskValues[l].ValueNumber==3) {
													SensorXYZ.Z = parseFloat(tempValue/100);
												} else if (s.Sensors[a].TaskValues[l].ValueNumber==4) {
													SensorCCT.Sensor = parseFloat(tempValue);
												}
											} else if (s.Sensors[a].TaskNumber==3 && $('#switch_7').prop('checked')===true) {
//												SensorData[(s.Sensors[a].TaskValues[l].ValueNumber-1)]['MeasuredValue']=tempValue;
												switch(s.Sensors[a].TaskValues[l].ValueNumber) {
													case 1:
														EmptySampleLightIntensity[330] = parseFloat(tempValue);
														break;
													case 2:
														EmptySampleLightIntensity[365] = parseFloat(tempValue);
														break;
													case 3:
														EmptySampleLightIntensity[410] = parseFloat(tempValue);
														break;
													case 4:
														EmptySampleLightIntensity[435] = parseFloat(tempValue);
														break;
												}
											} else if (s.Sensors[a].TaskNumber==4 && $('#switch_7').prop('checked')===true) {
												switch(s.Sensors[a].TaskValues[l].ValueNumber) {
													case 1:
														EmptySampleLightIntensity[460] = parseFloat(tempValue);
														break;
													case 2:
														EmptySampleLightIntensity[485] = parseFloat(tempValue);
														break;
													case 3:
														EmptySampleLightIntensity[510] = parseFloat(tempValue);
														break;
													case 4:
														EmptySampleLightIntensity[535] = parseFloat(tempValue);
														break;
												}
											} else if (s.Sensors[a].TaskNumber==5 && $('#switch_7').prop('checked')===true) {
												switch(s.Sensors[a].TaskValues[l].ValueNumber) {
													case 1:
														EmptySampleLightIntensity[560] = parseFloat(tempValue);
														break;
													case 2:
														EmptySampleLightIntensity[585] = parseFloat(tempValue);
														break;
													case 3:
														EmptySampleLightIntensity[610] = parseFloat(tempValue);
														break;
													case 4:
														EmptySampleLightIntensity[645] = parseFloat(tempValue);
														break;
												}
											} else if (s.Sensors[a].TaskNumber==6 && $('#switch_7').prop('checked')===true) {
												switch(s.Sensors[a].TaskValues[l].ValueNumber) {
													case 1:
														EmptySampleLightIntensity[680] = parseFloat(tempValue);
														break;
													case 2:
														EmptySampleLightIntensity[705] = parseFloat(tempValue);
														break;
													case 3:
														EmptySampleLightIntensity[730] = parseFloat(tempValue);
														break;
													case 4:
														EmptySampleLightIntensity[760] = parseFloat(tempValue);
														break;
												}
											} else if (s.Sensors[a].TaskNumber==7 && $('#switch_7').prop('checked')===true) {
												switch(s.Sensors[a].TaskValues[l].ValueNumber) {
													case 1:
														EmptySampleLightIntensity[810] = parseFloat(tempValue);
														break;
													case 2:
														EmptySampleLightIntensity[860] = parseFloat(tempValue);
														break;
													case 3:
														EmptySampleLightIntensity[900] = parseFloat(tempValue);
														break;
													case 4:
														EmptySampleLightIntensity[940] = parseFloat(tempValue);
														break;
												}

											} else if (s.Sensors[a].TaskNumber==3 && $('#switch_8').prop('checked')===true) {
//												SensorData[(s.Sensors[a].TaskValues[l].ValueNumber-1)]['MeasuredValue']=tempValue;
												switch(s.Sensors[a].TaskValues[l].ValueNumber) {
													case 1:
														SampleLightIntensity[330] = parseFloat(tempValue);
														break;
													case 2:
														SampleLightIntensity[365] = parseFloat(tempValue);
														break;
													case 3:
														SampleLightIntensity[410] = parseFloat(tempValue);
														break;
													case 4:
														SampleLightIntensity[435] = parseFloat(tempValue);
														break;
												}
											} else if (s.Sensors[a].TaskNumber==4 && $('#switch_8').prop('checked')===true) {
												switch(s.Sensors[a].TaskValues[l].ValueNumber) {
													case 1:
														SampleLightIntensity[460] = parseFloat(tempValue);
														break;
													case 2:
														SampleLightIntensity[485] = parseFloat(tempValue);
														break;
													case 3:
														SampleLightIntensity[510] = parseFloat(tempValue);
														break;
													case 4:
														SampleLightIntensity[535] = parseFloat(tempValue);
														break;
												}
											} else if (s.Sensors[a].TaskNumber==5 && $('#switch_8').prop('checked')===true) {
												switch(s.Sensors[a].TaskValues[l].ValueNumber) {
													case 1:
														SampleLightIntensity[560] = parseFloat(tempValue);
														break;
													case 2:
														SampleLightIntensity[585] = parseFloat(tempValue);
														break;
													case 3:
														SampleLightIntensity[610] = parseFloat(tempValue);
														break;
													case 4:
														SampleLightIntensity[645] = parseFloat(tempValue);
														break;
												}
											} else if (s.Sensors[a].TaskNumber==6 && $('#switch_8').prop('checked')===true) {
												switch(s.Sensors[a].TaskValues[l].ValueNumber) {
													case 1:
														SampleLightIntensity[680] = parseFloat(tempValue);
														break;
													case 2:
														SampleLightIntensity[705] = parseFloat(tempValue);
														break;
													case 3:
														SampleLightIntensity[730] = parseFloat(tempValue);
														break;
													case 4:
														SampleLightIntensity[760] = parseFloat(tempValue);
														break;
												}
											} else if (s.Sensors[a].TaskNumber==7 && $('#switch_8').prop('checked')===true) {
												switch(s.Sensors[a].TaskValues[l].ValueNumber) {
													case 1:
														SampleLightIntensity[810] = parseFloat(tempValue);
														break;
													case 2:
														SampleLightIntensity[860] = parseFloat(tempValue);
														break;
													case 3:
														SampleLightIntensity[900] = parseFloat(tempValue);
														break;
													case 4:
														SampleLightIntensity[940] = parseFloat(tempValue);
														break;
												}
											}
										} else {
											var sw="switch_"+(s.Sensors[a].TaskNumber);
											var swd=document.getElementById(sw);
											if (tempValue==0 && $(swd).prop('checked')===true && swaction==0) {
												$(swd).bootstrapToggle('enable', false);
												$(swd).bootstrapToggle('off', false);
											} else if (tempValue==0 && sw=="switch_8" && swaction==0 && $('#switch_7').prop('checked')===true) {
												$('#switch_7').bootstrapToggle('enable', false);
												$('#switch_7').bootstrapToggle('off', false);
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
};
