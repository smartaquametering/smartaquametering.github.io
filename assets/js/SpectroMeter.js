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

var SelectedSystem = {};
var SelectedMeasurement = {};
var SelectedSpectralDataImport = {};
var SelectedColorimetry = {};

// System settings
//
// Form: Illuminant type
var IlluminantType = {
	0:	{
			Name: "Incandescent lamp (Tungsten Halogen)",
			Standard: "",
			Note: "Warm White (3200 K)"
		},
	1:	{
			Name: "Broadband LED",
			Standard: "",
			Note: "Warm White / White (2700-6500 K)"
		},
	2:	{
			Name: "RGB LED",
			Standard: "",
			Note: "Red, Green, Blue (Monochromatic)"
		},
	3:	{
			Name: "Monochromatic LED",
			Standard: "",
			Note: "UVA, VIS and NIR (370-950 nm)"
		}
}
// Form: Illuminant
// Variable IlluminantSpectralData is defined in CIE-Illuminants-SDs.js
//
// Form: Beam angle
var Irradiation = {
	0:	{
			Name: "180 [°]",
			Standard: "",
			Note: "Transmitted light measurement (Absorbance)",
			BeamAngle: 180
		},
	1:	{
			Name: "90 [°]",
			Standard: "",
			Note: "Nephelometric turbidity (scattered light) measurement",
			BeamAngle: 90
		},
	2:	{
			Name: "90 [°]",
			Standard: "",
			Note: "Fluorescence measurement (Excitation light source)",
			BeamAngle: 90
		}
}
// Form: Cuvette thickness
var Cuvette = {
	0:	{
			Name: "10 [mm]",
			Standard: "",
			Note: "1.0 cm (10 mm) pathlength",
			Thickness: 1.0
		},
	1:	{
			Name: "11 [mm]",
			Standard: "",
			Note: "1.1 cm (11 mm) pathlength",
			Thickness: 1.1
		},
	2:	{
			Name: "14 [mm]",
			Standard: "",
			Note: "1.4 cm (14 mm) pathlength",
			Thickness: 1.4
		},
	3:	{
			Name: "15 [mm]",
			Standard: "",
			Note: "1.5 cm (15 mm) pathlength",
			Thickness: 1.5
		},
	4:	{
			Name: "16 [mm]",
			Standard: "",
			Note: "1.6 cm (16 mm) pathlength",
			Thickness: 1.6
		},
	5:	{
			Name: "20 [mm]",
			Standard: "",
			Note: "2.0 cm (20 mm) pathlength",
			Thickness: 2.0
		},
	6:	{
			Name: "40 [mm]",
			Standard: "",
			Note: "4.0 cm (40 mm) pathlength",
			Thickness: 4.0
		},
	7:	{
			Name: "50 [mm]",
			Standard: "",
			Note: "5.0 cm (50 mm) pathlength",
			Thickness: 5.0
		},
}
// Form: Sensor
var Sensor = {
	0:	{
			Name: "smartSpectroMeter",
			Standard: "",
			Note: "18 channel spectral sensor",
			Sensor: ""

//			ReadingData[4].Filter01Wavelength='615';
//			ReadingData[4].Filter01HalfWidth='25';
//			ReadingData[4].Filter02Wavelength='525';
//			ReadingData[4].Filter02HalfWidth='35';
//			ReadingData[4].Filter03Wavelength='465';
//			ReadingData[4].Filter03HalfWidth='15';
//
//			ReadingData[4].IlluminantWavelength='410-780';
//			ReadingData[4].GPIO='12';

		},
	1:	{
			Name: "smartPhotoMeter",
			Standard: "",
			Note: "LUX sensor",
			Sensor: ""
		},
	2:	{
			Name: "smartColorimeterMeter",
			Standard: "",
			Note: "RGB sensor",
			Sensor: ""
		},
	3:	{
			Name: "gratingSpectroMeter",
			Standard: "",
			Note: "USB webcam",
			Sensor: ""
		}
}

// Measurement settings
//
// Form: Measurement mode
var MeasurementMode = {
	0:	{
			Name: "Transmittance",
			Standard: "",
			Note: "For transmissive samples (e.g. Colored fluid); Associated to a reference illuminant (e.g. C, D50, D65)"
		},
	1:	{
			Name: "Reflectance",
			Standard: "",
			Note: "For reflective samples (e.g. Color patch); Associated to a reference illuminant (e.g. C, D50, D65)"
		},
	2:	{
			Name: "Emission",
			Standard: "",
			Note: "For emissive samples (e.g. Fluorescent fluid, LED); Does not involve a reference illuminant since the sample itself provides the light energy!"
		}
}
// Form: Color scale
// Variable ColorIndex is defined in ColorScales.js
//
// Form: Chart
var ChartType = {
	0:	{
			Name: "Spectral Power Distribution",
			Standard: "",
			Note: "Intensity of incident light ( I0 ) and/or transmitted light ( IT )"
		},
	1:	{
			Name: "Spectral Transmittance",
			Standard: "",
			Note: "Normalized intensity of light passing through the sample ( T = IT / I0 )"
		},
	2:	{
			Name: "Spectral Absorbance",
			Standard: "",
			Note: "Extinction/Attenuation ( Eλ = - log ( T ) = log ( 1 / T ) = ελ * c * d )"
		},
	3:	{
			Name: "CIE Color",
			Standard: "",
			Note: "CIE-Yxy/L*a*b* Chromaticity diagram"
		},
	4:	{
			Name: "RGB Color",
			Standard: "",
			Note: "Color patch based on selected RGB model"
		}
}

// Spectral data import settings
//
// Form: Spectral data import file
// Nothing to initialize
//
// Form: Spectral power distribution input
var SPDInput = {
	0:	{
			Name: "Relative intensity (0-1)",
			Standard: "",
			Note: "Normalized to the range of 0-1 (e.g. for emission spectra)"
		},
	1:	{
			Name: "Relative intensity (0-100%)",
			Standard: "",
			Note: "Normalized to the range of 0-100% (e.g. for Transmittance, reflection, adsorbance spectra)"
		},
	2:	{
			Name: "Intensity counts [W/nm]",
			Standard: "",
			Note: "Absolute intensity counts [W/nm] measured by spectral sensor"
		},
	3:	{
			Name: "Intensity counts [mW/nm]",
			Standard: "",
			Note: "Absolute intensity counts [mW/nm] measured by spectral sensor"
		},
	4:	{
			Name: "Intensity counts [µW/nm]",
			Standard: "",
			Note: "Absolute intensity counts [µW/nm] measured by spectral sensor"
		},
	5:	{
			Name: "Intensity counts [Photons/(s-nm)]",
			Standard: "",
			Note: "Absolute intensity counts [Photons/(s-nm)] measured by spectral sensor"
		},
	6:	{
			Name: "Flux (ADUs)",
			Standard: "",
			Note: "Absolute flux counts measured by spectral sensor"
		}
}
// Form: Wavelength increment
var SPDWaveLengthIncrement = {
	0:	{
			Name: "1 [nm]",
			Standard: "",
			Note: "Spectral data import with 1 nm step width",
			WaveLengthIncrement: 1.0
		},
	1:	{
			Name: "5 [nm]",
			Standard: "",
			Note: "Spectral data import with 5 nm step width",
			WaveLengthIncrement: 5.0
		}
}
// Form: Baseline
// Nothing to initialize
//
// Form: Baseline smoothing
var BaselineSmoothing = {
	0:	{
			Name: "None",
			Note: "Disabled",
			Factor: 1
		},
	1:	{
			Name: "1 %",
			Note: "",
			Factor: 0.01
		},
	2:	{
			Name: "2 %",
			Note: "",
			Factor: 0.02
		},
	3:	{
			Name: "3 %",
			Note: "",
			Factor: 0.03
		},
	4:	{
			Name: "4 %",
			Note: "",
			Factor: 0.04
		},
	5:	{
			Name: "5 %",
			Note: "",
			Factor: 0.05
		},
	6:	{
			Name: "6 %",
			Note: "",
			Factor: 0.06
		},
	7:	{
			Name: "7 %",
			Note: "",
			Factor: 0.07
		},
	8:	{
			Name: "8 %",
			Note: "",
			Factor: 0.08
		},
	9:	{
			Name: "9 %",
			Note: "",
			Factor: 0.09
		},
	10:	{
			Name: "10 %",
			Note: "",
			Factor: 0.1
		}
}

// Colorimetry settings
//
// Form: Standard observer
// Variable StandardObserver is defined in ColorConversions.js
//
// Form: Reference white
// Variable IlluminantSpectralData is defined in CIE-Illuminants-SDs.js
//
// Form: Adaptation method
// Variable ChromaticAdaptation is defined in ColorConversions.js
//
// Form: RGB model
// Variable RGBColorSpace is defined in RGB-Models.js
//
// Form: RGB gamma
// Variable RGBGamma is defined in RGB-Models.js
//
// RGB-Models.js
// Form: Scale values
var Scaling = {
	0:	{
			Name: "CIE-XYZ",
			Standard: "",
			Note: "Range of XYZ values",
			Factor: 100,
			Range:	{
				UnScaled: "0.0-1.0",
				Scaled: "0.0-100.0"
			}
		},
	1:	{
			Name: "CIE-xyY",
			Standard: "",
			Note: "Range of Y value",
			Factor: 100,
			Range:	{
				UnScaled: "0.0-1.0",
				Scaled: "0.0-100.0"
			}
		},
	2:	{
			Name: "RGB",
			Standard: "",
			Note: "Range of RGB values",
			Factor: 255,
			Range:	{
				UnScaled: "0.0-1.0",
				Scaled: "0.0-255.0"
			}
		}
}

jQuery.event.special.mousewheel = {
	setup: function( _, ns, handle ) {
		this.addEventListener('mousewheel', handle, { passive: !ns.includes('noPreventDefault') });
	}
};

window.onbeforeunload = function() {
	return "Dude, are you sure you want to leave? Think of the kittens!";
}

function DocumentOnLoad() {

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

	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback();

	var SampleMode;
	var swaction=0;
	var ProtocolID=0;
	var ProtocolData=[];
	var LogData=[];

	var IlluminantData = {
		0:	{
				Manufacturer: 'Nichia',
				ProductID: 'NSDL570GS-K1',
				ProductSpec: "https://www.nichia.co.jp/de/product/led_product_data.html?type=%27NSDL570GS-K1%27",
				DeviceType: 'Broadband LED',
				Color: 'Warm White',
				CCT: 2700,
				XYZ: '',
				DominantWavelength: '',
				FWHMBandwidth: '',
				Channel: {'ID':'PWM1.PWM', 'OutputPin': '0', 'Mode': 'PWM', 'DimValue': '4095'}
			},
		1:	{
				Manufacturer: 'Nichia',
				ProductID: 'NSDL510GS-K1',
				ProductSpec: "https://www.nichia.co.jp/de/product/led_product_data.html?type=%27NSDL510GS-K1%27",
				DeviceType: 'Broadband LED',
				Color: 'Warm White',
				CCT: 2800,
				XYZ: '',
				DominantWavelength: '',
				FWHMBandwidth: '',
				Channel: {'ID':'PWM1.PWM', 'OutputPin': '1', 'Mode': 'PWM', 'DimValue': '1648'}
			},
		2:	{
				Manufacturer: 'Nichia',
				ProductID: 'NSPL500DS',
				ProductSpec: "http://www.nichia.co.jp/en/product/led_product_data.html?type=%27NSPL500DS%27",
				DeviceType: 'Broadband LED',
				Color: 'Warm White',
				CCT: 3000,
				XYZ: '',
				DominantWavelength: '',
				FWHMBandwidth: '',
				Channel: {'ID':'PWM1.PWM', 'OutputPin': '2', 'Mode': 'PWM', 'DimValue': '1120'}
			},
		3:	{
				Manufacturer: 'Nichia',
				ProductID: 'NSPL510DS',
				ProductSpec: "http://www.nichia.co.jp/en/product/led_product_data.html?type=%27NSPL510DS%27",
				DeviceType: 'Broadband LED',
				Color: 'Warm White',
				CCT: 4000,
				XYZ: '',
				DominantWavelength: '',
				FWHMBandwidth: '',
				Channel: {'ID':'PWM1.PWM', 'OutputPin': '3', 'Mode': 'PWM', 'DimValue': '1605'}
			},
		4:	{
				Manufacturer: 'Nichia',
				ProductID: 'NSPW500GS-K1',
				ProductSpec: "http://www.nichia.co.jp/en/product/led_product_data.html?type=%27NSPW500GS-K1%27",
				DeviceType: 'Broadband LED',
				Color: 'White',
				CCT: 5000,
				XYZ: '',
				DominantWavelength: '',
				FWHMBandwidth: '',
				Channel: {'ID':'PWM1.PWM', 'OutputPin': '4', 'Mode': 'PWM', 'DimValue': '1002'}
			},
		5:	{
				Manufacturer: 'Nichia',
				ProductID: 'NSPW570DS',
				ProductSpec: "http://www.nichia.co.jp/en/product/led_product_data.html?type=%27NSPW570DS%27",
				DeviceType: 'Broadband LED',
				Color: 'White',
				CCT: 6500,
				XYZ: '',
				DominantWavelength: '',
				FWHMBandwidth: '',
				Channel: {'ID':'PWM1.PWM', 'OutputPin': '5', 'Mode': 'PWM', 'DimValue': '1702'}
			},
		6:	{
				Manufacturer: 'Nichia',
				ProductID: 'NSPU510CS',
				ProductSpec: "http://www.nichia.co.jp/specification/products/led/NSPU510CS-E.pdf",
				DeviceType: 'Monochromatic LED',
				Color: 'UVA',
				CCT: '',
				XYZ: '',
				DominantWavelength: 375,
				FWHMBandwidth: 23,
				Channel: {'ID':'PWM1.PWM', 'OutputPin': '6', 'Mode': 'PWM', 'DimValue': '1907'}
			},
		7:	{
				Manufacturer: 'Lumitronix UV',
				ProductID: 'UV',
				ProductSpec: "https://www.leds.de/low-budget-5mm-led-uv-300mcd-436nm-15401.html",
				DeviceType: 'Monochromatic LED',
				Color: 'Deep purple',
				CCT: '',
				XYZ: '',
				DominantWavelength: 398,
				FWHMBandwidth: 27,
				Channel: {'ID':'PWM1.PWM', 'OutputPin': '7', 'Mode': 'PWM', 'DimValue': '107'}
			},
		8:	{
				Manufacturer: 'EverLight',
				ProductID: '383UBC/H2',
				ProductSpec: "https://cdn-reichelt.de/documents/datenblatt/A500/07500580.pdf",
				DeviceType: 'Monochromatic LED',
				Color: 'Bluish purple',
				CCT: '',
				XYZ: '',
				DominantWavelength: '424, 486',
				FWHMBandwidth: 115,
				Channel: {'ID':'PWM1.PWM', 'OutputPin': '8', 'Mode': 'PWM', 'DimValue': '4095'}
			},
		9:	{
				Manufacturer: 'Kingbright',
				ProductID: 'L-7113QBC-D',
				ProductSpec: "https://www.kingbright.com/attachments/file/psearch/000/00/00/L-7113QBC-D(Ver.28B).pdf",
				DeviceType: 'Monochromatic LED',
				Color: 'Greenisch bright blue',
				CCT: '',
				XYZ: '',
				DominantWavelength: 480,
				FWHMBandwidth: 45,
				Channel: {'ID':'PWM1.PWM', 'OutputPin': '9', 'Mode': 'PWM', 'DimValue': '172'}
			},
		10:	{
				Manufacturer: 'Nichia',
				ProductID: 'NEPE510JS',
				ProductSpec: "https://www.nichia.co.jp/en/product/led_product_data.html?type=%27NEPE510JS%27",
				DeviceType: 'Monochromatic LED',
				Color: 'Greenish cyan',
				CCT: '',
				XYZ: '',
				DominantWavelength: 504,
				FWHMBandwidth: 30,
				Channel: {'ID':'PWM1.PWM', 'OutputPin': '10', 'Mode': 'PWM', 'DimValue': '161'}
			},
		11:	{
				Manufacturer: 'Kingbright',
				ProductID: 'L-7113ZGC',
				ProductSpec: "https://www.kingbright.com/attachments/file/psearch/000/00/00/L-7113ZGC(Ver.18B).pdf",
				DeviceType: 'Monochromatic LED',
				Color: 'Pure green',
				CCT: '',
				XYZ: '',
				DominantWavelength: 525,
				FWHMBandwidth: 45,
				Channel: {'ID':'PWM1.PWM', 'OutputPin': '11', 'Mode': 'PWM', 'DimValue': '215'}
			},
		12:	{
				Manufacturer: 'Nichia',
				ProductID: 'NSPG500DS',
				ProductSpec: "https://docs.rs-online.com/9576/0900766b80e762bf.pdf",
				DeviceType: 'Monochromatic LED',
				Color: 'Green',
				CCT: '',
				XYZ: '',
				DominantWavelength: 532,
				FWHMBandwidth: 53,
				Channel: {'ID':'PWM1.PWM', 'OutputPin': '12', 'Mode': 'PWM', 'DimValue': '100'}
			},
		13:	{
				Manufacturer: 'Kingbright',
				ProductID: 'L-7113CGCK',
				ProductSpec: "https://www.kingbright.com/attachments/file/psearch/000/00/watermark00/L-7113CGCK(Ver.18B).pdf",
				DeviceType: 'Monochromatic LED',
				Color: 'Citrus yellow',
				CCT: '',
				XYZ: '',
				DominantWavelength: 576,
				FWHMBandwidth: 40,
				Channel: {'ID':'PWM1.PWM', 'OutputPin': '13', 'Mode': 'PWM', 'DimValue': '679'}
			},
		14:	{
				Manufacturer: 'Lumitronix',
				ProductID: 'Yellow',
				ProductSpec: "https://www.leds.de/low-budget-5mm-led-2347mcd-gelb-15511.html",
				DeviceType: 'Monochromatic LED',
				Color: 'Natrium Yellow',
				CCT: '',
				XYZ: '',
				DominantWavelength: 596,
				FWHMBandwidth: 35,
				Channel: {'ID':'PWM1.PWM', 'OutputPin': '14', 'Mode': 'PWM', 'DimValue': '140'}
			},
		15:	{
				Manufacturer: 'EverLight',
				ProductID: '383-2UYOC/S400-A7',
				ProductSpec: "https://cdn-reichelt.de/documents/datenblatt/A500/07503774.pdf",
				DeviceType: 'Monochromatic LED',
				Color: 'Pure orange',
				CCT: '',
				XYZ: '',
				DominantWavelength: 615,
				FWHMBandwidth: 35,
				Channel: {'ID':'PWM1.PWM', 'OutputPin': '15', 'Mode': 'PWM', 'DimValue': '32'}
			},
		16:	{
				Manufacturer: 'Kingbright',
				ProductID: 'L-7113SEC-J3',
				ProductSpec: "http://www.kingbright.com/attachments/file/psearch/000/00/00/L-7113SEC-J3-TNR2.54-RY(Ver.1).pdf",
				DeviceType: 'Monochromatic LED',
				Color: 'Bright red',
				CCT: '',
				XYZ: '',
				DominantWavelength: 637,
				FWHMBandwidth: 40,
				Channel: {'ID':'PWM2.PWM', 'OutputPin': '0', 'Mode': 'PWM', 'DimValue': '54'}
			},
		17:	{
				Manufacturer: 'Kingbright',
				ProductID: 'L-7113SRC-DU',
				ProductSpec: "https://www.reichelt.de/index.html?ACTION=7&LA=3&OPEN=0&INDEX=0&FILENAME=A500%2FSGL-7113SRC-DU_E.pdf",
				DeviceType: 'Monochromatic LED',
				Color: 'Hyper Red',
				CCT: '',
				XYZ: '',
				DominantWavelength: 660,
				FWHMBandwidth: 45,
				Channel: {'ID':'PWM2.PWM', 'OutputPin': '1', 'Mode': 'PWM', 'DimValue': '129'}
			},
		18:	{
				Manufacturer: 'Kingbright',
				ProductID: 'L-7113HD',
				ProductSpec: "https://www.reichelt.de/index.html?ACTION=7&LA=3&OPEN=0&INDEX=0&FILENAME=A500%2FRPL-7113HD_DATA_E.pdf",
				DeviceType: 'Monochromatic LED',
				Color: 'Very deep red',
				CCT: '',
				XYZ: '',
				DominantWavelength: 697,
				FWHMBandwidth: 75,
				Channel: {'ID':'PWM2.PWM', 'OutputPin': '2', 'Mode': 'PWM', 'DimValue': '4095'}
			},
		19:	{
				Manufacturer: 'EverLight',
				ProductID: 'HIR383C/L289',
				ProductSpec: "https://everlighteurope.com/ir-emitters/149/HIR383CL289.html",
				DeviceType: 'Monochromatic LED',
				Color: '',
				CCT: '',
				XYZ: '',
				DominantWavelength: 847,
				FWHMBandwidth: 50,
				Channel: {'ID':'PWM2.PWM', 'OutputPin': '3', 'Mode': 'PWM', 'DimValue': '334'}
			},
		20:	{
				Manufacturer: 'OSRAM',
				ProductID: 'SFH-4544-OSO',
				ProductSpec: "https://www.osram.com/ecat/Radial%20T1%203-4%20SFH%204544/com/en/class_pim_web_catalog_103489/prd_pim_device_2219771/",
				DeviceType: 'Monochromatic LED',
				Color: 'NIR',
				CCT: '',
				XYZ: '',
				DominantWavelength: 950,
				FWHMBandwidth: 35,
				Channel: {'ID':'PWM2.PWM', 'OutputPin': '4', 'Mode': 'PWM', 'DimValue': '4095'}
			},
		21:	{
				Manufacturer: '',
				ProductID: '',
				ProductSpec: "",
				DeviceType: 'LED',
				Color: '',
				CCT: '',
				XYZ: '',
				DominantWavelength: '',
				FWHMBandwidth: '',
				Channel: {'ID':'PWM2.PWM', 'OutputPin': '5', 'Mode': 'PWM', 'DimValue': '2048'}
			},
		22:	{
				Manufacturer: '',
				ProductID: '',
				ProductSpec: "",
				DeviceType: 'LED',
				Color: '',
				CCT: '',
				XYZ: '',
				DominantWavelength: '',
				FWHMBandwidth: '',
				Channel: {'ID':'PWM2.PWM', 'OutputPin': '6', 'Mode': 'PWM', 'DimValue': '2048'}
			},
		23:	{
				Manufacturer: '',
				ProductID: '',
				ProductSpec: "",
				DeviceType: 'LED',
				Color: '',
				CCT: '',
				XYZ: '',
				DominantWavelength: '',
				FWHMBandwidth: '',
				Channel: {'ID':'PWM2.PWM', 'OutputPin': '7', 'Mode': 'PWM', 'DimValue': '2048'}
			},
		24:	{
				Manufacturer: '',
				ProductID: '',
				ProductSpec: "",
				DeviceType: 'LED',
				Color: '',
				CCT: '',
				XYZ: '',
				DominantWavelength: '',
				FWHMBandwidth: '',
				Channel: {'ID':'PWM2.PWM', 'OutputPin': '8', 'Mode': 'PWM', 'DimValue': '2048'}
			},
		25:	{
				Manufacturer: '',
				ProductID: '',
				ProductSpec: "",
				DeviceType: 'LED',
				Color: '',
				CCT: '',
				XYZ: '',
				DominantWavelength: '',
				FWHMBandwidth: '',
				Channel: {'ID':'PWM2.PWM', 'OutputPin': '9', 'Mode': 'PWM', 'DimValue': '2048'}
			},
		26:	{
				Manufacturer: '',
				ProductID: '',
				ProductSpec: "",
				DeviceType: 'LED',
				Color: '',
				CCT: '',
				XYZ: '',
				DominantWavelength: '',
				FWHMBandwidth: '',
				Channel: {'ID':'PWM2.PWM', 'OutputPin': '10', 'Mode': 'PWM', 'DimValue': '2048'}
			},
		27:	{
				Manufacturer: '',
				ProductID: '',
				ProductSpec: "",
				DeviceType: 'LED',
				Color: '',
				CCT: '',
				XYZ: '',
				DominantWavelength: '',
				FWHMBandwidth: '',
				Channel: {'ID':'PWM2.PWM', 'OutputPin': '11', 'Mode': 'PWM', 'DimValue': '2048'}
			},
		28:	{
				Manufacturer: 'LuckyLight',
				ProductID: '470 nm',
				ProductSpec: "",
				DeviceType: 'RGB LED',
				Color: '',
				CCT: '',
				XYZ: '',
				DominantWavelength: '',
				FWHMBandwidth: '',
				Channel: {'ID':'PWM2.PWM', 'OutputPin': '12', 'Mode': 'PWM', 'DimValue': '2048'}
			},
		29:	{
				Manufacturer: 'LuckyLight',
				ProductID: '525 nm',
				ProductSpec: "",
				DeviceType: 'RGB LED',
				Color: '',
				CCT: '',
				XYZ: '',
				DominantWavelength: '',
				FWHMBandwidth: '',
				Channel: {'ID':'PWM2.PWM', 'OutputPin': '13', 'Mode': 'PWM', 'DimValue': '2048'}
			},
		30:	{
				Manufacturer: 'LuckyLight',
				ProductID: '625 nm',
				ProductSpec: "",
				DeviceType: 'RGB LED',
				Color: '',
				CCT: '',
				XYZ: '',
				DominantWavelength: '',
				FWHMBandwidth: '',
				Channel: {'ID':'PWM2.PWM', 'OutputPin': '14', 'Mode': 'PWM', 'DimValue': '2048'}
			},
		31:	{
				Manufacturer: 'Philips',
				ProductID: '',
				ProductSpec: "",
				DeviceType: 'Tungsten Halogen lamp',
				Color: '',
				CCT: 3200,
				XYZ: '',
				DominantWavelength: '',
				FWHMBandwidth: '',
				Channel: {'ID':'PWM2.PWM', 'OutputPin': '15', 'Mode': 'PWM', 'DimValue': '2048'}
			}
	}

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
			ReadingData[4]['ColorDifference']='';
			ReadingData[4]['Settings']='';
		ReadingData[5]=new Array();
			ReadingData[5]['Readings']='<var>T<sub>λ</sub></var>';
			ReadingData[5]['ValueReference']='';
			ReadingData[5]['ValueSample']='';
			ReadingData[5]['ValueSpectrum']='';
			ReadingData[5]['ColorDifference']='';
		ReadingData[6]=new Array();
			ReadingData[6]['Readings']='<var>E<sub>λ</sub></var>';
			ReadingData[6]['ValueReference']='';
			ReadingData[6]['ValueSample']='';
			ReadingData[6]['ValueSpectrum']='';
			ReadingData[6]['ColorDifference']='';
		ReadingData[7]=new Array();
			ReadingData[7]['Readings']='<var>SAC<sub>λ</sub></var>';
			ReadingData[7]['ValueReference']='';
			ReadingData[7]['ValueSample']='';
			ReadingData[7]['ValueSpectrum']='';
			ReadingData[7]['ColorDifference']='';
		ReadingData[8]=new Array();
			ReadingData[8]['Readings']='CIE-XYZ';
			ReadingData[8]['ValueReference']='';
			ReadingData[8]['ValueSample']='';
			ReadingData[8]['ValueSpectrum']='';
			ReadingData[8]['ColorDifference']='';
		ReadingData[9]=new Array();
			ReadingData[9]['Readings']='CIE-xyY';
			ReadingData[9]['ValueReference']='';
			ReadingData[9]['ValueSample']='';
			ReadingData[9]['ValueSpectrum']='';
			ReadingData[9]['ColorDifference']='';
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
			ReadingData[14]['ColorDifference']='';
		ReadingData[15]=new Array();
			ReadingData[15]['Readings']='Dominant λ';
			ReadingData[15]['ValueReference']='';
			ReadingData[15]['ValueSample']='';
			ReadingData[15]['ValueSpectrum']='';
			ReadingData[15]['ColorDifference']='';
		ReadingData[16]=new Array();
			ReadingData[16]['Readings']='Nearest color(s)';
			ReadingData[16]['ValueReference']='';
			ReadingData[16]['ValueSample']='';
			ReadingData[16]['ValueSpectrum']='';
			ReadingData[16]['ColorDifference']='';
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

	var SensorLightIntensity = {};
	var SensorXYZ = {};
	var SensorxyY = {};
	var SensorRGB = {};
	var SensorLab = { L: 100, a: 0, b: 0 };
	var SensorCCT = {};

	var EmptySampleLightIntensity = {};
	var EmptySampleXYZ = {};
	var EmptySamplexyY = {};
	var EmptySampleRGB = {};
	var EmptySampleLab = {};
	var EmptySampleLuv = {};
	var EmptySampleHunterLab = {};
	var EmptySampleCCT = {};
	var EmptySampleDominantWavelength;
	var EmptySampleNearestColors = {};

	var SampleLightIntensity = {};
	var SampleTransmission = {};
	var SampleAbsorbance = {};
	var SampleSAC = {};
	var SampleXYZ = {};
	var SamplexyY = {};
	var SampleRGB = {};
	var SampleLab = {};
	var SampleLuv = {};
	var SampleHunterLab = {};
	var SampleCCT = {};
	var SampleDominantWavelength;
	var SampleNearestColors = {};

	var SpectrumLightIntensity = {};
	var SpectrumTransmission = {};
	var SpectrumAbsorbance = {};
	var SpectrumSAC = {};
	var SpectrumXYZ = {};
	var SpectrumxyY = {};
	var SpectrumRGB = {};
	var SpectrumLab = {};
	var SpectrumLuv = {};
	var SpectrumHunterLab = {};
	var SpectrumCCT = {};
	var SpectrumDominantWavelength;
	var SpectrumNearestColors = {};

	// Sample switches
	//
	// Empty Sample
	$('#switch_7').change(function() {
		if ($(this).prop('checked')===true) {
			swaction = 1;
			$.get('./control?cmd=GPIO,'+ReadingData[2].GPIO+',1');
			ToggleState('disable');
			ResetReadingData();
		} else {
			ToggleState('enable');
			SampleMode = 'Empty Sample';
			UpdateReadingData();
		}
	});
	// Sample
	$('#switch_8').change(function() {
		if ($(this).prop('checked')===true) {
			swaction = 1;
			$.get('./control?cmd=GPIO,'+ReadingData[3].GPIO+',1');
			ToggleState('disable');
			ResetTransmissionReadingData();
		} else {
			ToggleState('enable');
			SampleMode = 'Sample';
			UpdateReadingData();
			AppendProtocolData();
		}
	});

	// LED switches and dimming slider
	//
	$('#ledswitch_0').change(function() {LedSwitch($(this).prop('id'),IlluminantData[0].Channel)});
	$('#ledswitch_1').change(function() {LedSwitch($(this).prop('id'),IlluminantData[1].Channel)});
	$('#ledswitch_2').change(function() {LedSwitch($(this).prop('id'),IlluminantData[2].Channel)});
	$('#ledswitch_3').change(function() {LedSwitch($(this).prop('id'),IlluminantData[3].Channel)});
	$('#ledswitch_4').change(function() {LedSwitch($(this).prop('id'),IlluminantData[4].Channel)});
	$('#ledswitch_5').change(function() {LedSwitch($(this).prop('id'),IlluminantData[5].Channel)});
	$('#ledswitch_6').change(function() {LedSwitch($(this).prop('id'),IlluminantData[6].Channel)});
	$('#ledswitch_7').change(function() {LedSwitch($(this).prop('id'),IlluminantData[7].Channel)});
	$('#ledswitch_8').change(function() {LedSwitch($(this).prop('id'),IlluminantData[8].Channel)});
	$('#ledswitch_9').change(function() {LedSwitch($(this).prop('id'),IlluminantData[9].Channel)});
	$('#ledswitch_10').change(function() {LedSwitch($(this).prop('id'),IlluminantData[10].Channel)});
	$('#ledswitch_11').change(function() {LedSwitch($(this).prop('id'),IlluminantData[11].Channel)});
	$('#ledswitch_12').change(function() {LedSwitch($(this).prop('id'),IlluminantData[12].Channel)});
	$('#ledswitch_13').change(function() {LedSwitch($(this).prop('id'),IlluminantData[13].Channel)});
	$('#ledswitch_14').change(function() {LedSwitch($(this).prop('id'),IlluminantData[14].Channel)});
	$('#ledswitch_15').change(function() {LedSwitch($(this).prop('id'),IlluminantData[15].Channel)});
	$('#ledswitch_16').change(function() {LedSwitch($(this).prop('id'),IlluminantData[16].Channel)});
	$('#ledswitch_17').change(function() {LedSwitch($(this).prop('id'),IlluminantData[17].Channel)});
	$('#ledswitch_18').change(function() {LedSwitch($(this).prop('id'),IlluminantData[18].Channel)});
	$('#ledswitch_19').change(function() {LedSwitch($(this).prop('id'),IlluminantData[19].Channel)});
	$('#ledswitch_20').change(function() {LedSwitch($(this).prop('id'),IlluminantData[20].Channel)});
	$('#ledswitch_21').change(function() {LedSwitch($(this).prop('id'),IlluminantData[21].Channel)});
	$('#ledswitch_22').change(function() {LedSwitch($(this).prop('id'),IlluminantData[22].Channel)});
	$('#ledswitch_23').change(function() {LedSwitch($(this).prop('id'),IlluminantData[23].Channel)});
	$('#ledswitch_24').change(function() {LedSwitch($(this).prop('id'),IlluminantData[24].Channel)});
	$('#ledswitch_25').change(function() {LedSwitch($(this).prop('id'),IlluminantData[25].Channel)});
	$('#ledswitch_26').change(function() {LedSwitch($(this).prop('id'),IlluminantData[26].Channel)});
	$('#ledswitch_27').change(function() {LedSwitch($(this).prop('id'),IlluminantData[27].Channel)});
	$('#ledswitch_28').change(function() {LedSwitch($(this).prop('id'),IlluminantData[28].Channel)});
	$('#ledswitch_29').change(function() {LedSwitch($(this).prop('id'),IlluminantData[29].Channel)});
	$('#ledswitch_30').change(function() {LedSwitch($(this).prop('id'),IlluminantData[30].Channel)});
	$('#ledswitch_31').change(function() {LedSwitch($(this).prop('id'),IlluminantData[31].Channel)});

	$("#ledswitch_0_slider").on("slideStop", function() {LedSwitch('ledswitch_0',IlluminantData[0].Channel)});
	$("#ledswitch_1_slider").on("slideStop", function() {LedSwitch('ledswitch_1',IlluminantData[1].Channel)});
	$("#ledswitch_2_slider").on("slideStop", function() {LedSwitch('ledswitch_2',IlluminantData[2].Channel)});
	$("#ledswitch_3_slider").on("slideStop", function() {LedSwitch('ledswitch_3',IlluminantData[3].Channel)});
	$("#ledswitch_4_slider").on("slideStop", function() {LedSwitch('ledswitch_4',IlluminantData[4].Channel)});
	$("#ledswitch_5_slider").on("slideStop", function() {LedSwitch('ledswitch_5',IlluminantData[5].Channel)});
	$("#ledswitch_6_slider").on("slideStop", function() {LedSwitch('ledswitch_6',IlluminantData[6].Channel)});
	$("#ledswitch_7_slider").on("slideStop", function() {LedSwitch('ledswitch_7',IlluminantData[7].Channel)});
	$("#ledswitch_8_slider").on("slideStop", function() {LedSwitch('ledswitch_8',IlluminantData[8].Channel)});
	$("#ledswitch_9_slider").on("slideStop", function() {LedSwitch('ledswitch_9',IlluminantData[9].Channel)});
	$("#ledswitch_10_slider").on("slideStop", function() {LedSwitch('ledswitch_10',IlluminantData[10].Channel)});
	$("#ledswitch_11_slider").on("slideStop", function() {LedSwitch('ledswitch_11',IlluminantData[11].Channel)});
	$("#ledswitch_12_slider").on("slideStop", function() {LedSwitch('ledswitch_12',IlluminantData[12].Channel)});
	$("#ledswitch_13_slider").on("slideStop", function() {LedSwitch('ledswitch_13',IlluminantData[13].Channel)});
	$("#ledswitch_14_slider").on("slideStop", function() {LedSwitch('ledswitch_14',IlluminantData[14].Channel)});
	$("#ledswitch_15_slider").on("slideStop", function() {LedSwitch('ledswitch_15',IlluminantData[15].Channel)});
	$("#ledswitch_16_slider").on("slideStop", function() {LedSwitch('ledswitch_16',IlluminantData[16].Channel)});
	$("#ledswitch_17_slider").on("slideStop", function() {LedSwitch('ledswitch_17',IlluminantData[17].Channel)});
	$("#ledswitch_18_slider").on("slideStop", function() {LedSwitch('ledswitch_18',IlluminantData[18].Channel)});
	$("#ledswitch_19_slider").on("slideStop", function() {LedSwitch('ledswitch_19',IlluminantData[19].Channel)});
	$("#ledswitch_20_slider").on("slideStop", function() {LedSwitch('ledswitch_20',IlluminantData[20].Channel)});
	$("#ledswitch_21_slider").on("slideStop", function() {LedSwitch('ledswitch_21',IlluminantData[21].Channel)});
	$("#ledswitch_22_slider").on("slideStop", function() {LedSwitch('ledswitch_22',IlluminantData[22].Channel)});
	$("#ledswitch_23_slider").on("slideStop", function() {LedSwitch('ledswitch_23',IlluminantData[23].Channel)});
	$("#ledswitch_24_slider").on("slideStop", function() {LedSwitch('ledswitch_24',IlluminantData[24].Channel)});
	$("#ledswitch_25_slider").on("slideStop", function() {LedSwitch('ledswitch_25',IlluminantData[25].Channel)});
	$("#ledswitch_26_slider").on("slideStop", function() {LedSwitch('ledswitch_26',IlluminantData[26].Channel)});
	$("#ledswitch_27_slider").on("slideStop", function() {LedSwitch('ledswitch_27',IlluminantData[27].Channel)});
	$("#ledswitch_28_slider").on("slideStop", function() {LedSwitch('ledswitch_28',IlluminantData[28].Channel)});
	$("#ledswitch_29_slider").on("slideStop", function() {LedSwitch('ledswitch_29',IlluminantData[29].Channel)});
	$("#ledswitch_30_slider").on("slideStop", function() {LedSwitch('ledswitch_30',IlluminantData[30].Channel)});
	$("#ledswitch_31_slider").on("slideStop", function() {LedSwitch('ledswitch_31',IlluminantData[31].Channel)});

	// System settings
	//
	$('#IlluminantType').change(function() {
		SelectedSystem.IlluminantType = $(this).val();
		GetSystem(SelectedSystem);

		if (SelectedSystem.IlluminantType.includes('0')) {
			$("#IncandescentLamp").fadeIn();
		} else {
			$("#IncandescentLamp").fadeOut();
		}
		if (SelectedSystem.IlluminantType.includes('1')) {
			$("#BroadbandLED").fadeIn();
		} else {
			$("#BroadbandLED").fadeOut();
		}
		if (SelectedSystem.IlluminantType.includes('2')) {
			$("#RGBLED").fadeIn();
		} else {
			$("#RGBLED").fadeOut();
		}
		if (SelectedSystem.IlluminantType.includes('3')) {
			$("#MonochromaticLED").fadeIn();
		} else {
			$("#MonochromaticLED").fadeOut();
		}
	});
	$('#Illuminant').change(function() {
		SelectedSystem.Illuminant = parseInt($(this).prop('value'));
		GetSystem(SelectedSystem);
		UpdateReadingData();
	});
	$('#BeamAngle').change(function() {
		SelectedSystem.Irradiation = parseInt($(this).prop('value'));
		GetSystem(SelectedSystem);
		UpdateReadingData();
	});
	$('#CuvetteThickness').change(function() {
		SelectedSystem.Cuvette = parseInt($(this).prop('value'));
		GetSystem(SelectedSystem);
		UpdateReadingData();
	});
	$('#Sensor').change(function() {
		SelectedSystem.Sensor = $(this).val();
		GetSystem(SelectedSystem);
	});

	// Measurement settings
	//
	$('#MeasurementMode').change(function() {
		SelectedMeasurement.Mode = parseInt($(this).prop('value'));
		GetMeasurement(SelectedMeasurement);
		UpdateReadingData();
	});
	$('#ColorScale').change(function() {
		SelectedMeasurement.ColorScale = parseInt($(this).prop('value'));

		SelectedColorimetry.Observer = ColorIndex[SelectedMeasurement.ColorScale].ObserverID;
		$("#Observer").val(SelectedColorimetry.Observer);
		$("#Observer").selectpicker("refresh");

		SelectedColorimetry.ReferenceCellPathLength = ColorIndex[SelectedMeasurement.ColorScale].ReferenceCellPathLength;
		$("#ReferenceCellPathLength").val(SelectedColorimetry.ReferenceCellPathLength);
		$("#ReferenceCellPathLength").selectpicker("refresh");

		SelectedColorimetry.ReferenceWhite = ColorIndex[SelectedMeasurement.ColorScale].ReferenceWhiteID;
		$("#ReferenceWhite").val(SelectedColorimetry.ReferenceWhite);
		$("#ReferenceWhite").selectpicker("refresh");

		GetMeasurement(SelectedMeasurement);
		GetColorimetry(SelectedColorimetry);
		UpdateReadingData();
	});
	$('#Chart').change(function() {
		SelectedMeasurement.Chart = $(this).val();
		GetMeasurement(SelectedMeasurement);
		UpdateReadingData();
	});

	// Spectral data import settings
	//
	$('#SPDFile').change(function(e) {
		if (e.target.files.length === 0) {
			console.log('No file selected');
			return;
		}
		if (e.target.files.length) {
			$(this).next('.custom-file-label').html(e.target.files[0].name);
			SelectedSpectralDataImport.SPDFile = e.target.files[0].name;
			GetSpectralDataImport(SelectedSpectralDataImport);
		}
		const reader = new FileReader();
		reader.onload = function fileReadCompleted() {
			EmptySampleLightIntensity = {};
			SampleLightIntensity = {};
			var allLines = this.result.split(/\r\n|\n/);
			allLines.forEach((line) => {
				var strParts = line.split(",");
				if (strParts[0] > 0) {
					strParts[0] = Math.round(strParts[0].trim());
					if (strParts[1]) {
						EmptySampleLightIntensity[strParts[0]] = strParts[1].trim();
					}
					if (strParts[2]) {
						SampleLightIntensity[strParts[0]] = strParts[2].trim();
					}
				}
			});
			SampleMode = 'Sample';
			UpdateReadingData();
		};
		reader.readAsText(e.target.files[0]);
	});
	$('#SPDInput').change(function() {
		SelectedSpectralDataImport.SPDInput = parseInt($(this).prop('value'));
		GetSpectralDataImport(SelectedSpectralDataImport);
		UpdateReadingData();
	});
	$('#SPDWaveLengthIncrement').change(function() {
		SelectedSpectralDataImport.SPDWaveLengthIncrement = parseInt($(this).prop('value'));
		GetSpectralDataImport(SelectedSpectralDataImport);
		UpdateReadingData();
	});
	$('#Baseline').change(function() {
		SelectedSpectralDataImport.Baseline = parseFloat($(this).prop('value'));
		$('#SPDFile').trigger('change');
		GetSpectralDataImport(SelectedSpectralDataImport);
		UpdateReadingData();
	});
	$('#BaselineSmoothing').change(function() {
		SelectedSpectralDataImport.BaselineSmoothing = parseInt($(this).prop('value'));
		GetSpectralDataImport(SelectedSpectralDataImport);
		$('#SPDFile').trigger('change');
		UpdateReadingData();
	});

	// Colorimetry settings
	//
	$('#Observer').change(function() {
		SelectedColorimetry.Observer = parseInt($(this).prop('value'));
		GetColorimetry(SelectedColorimetry);
		UpdateReadingData();
	});
	$('#ReferenceWhite').change(function() {
		SelectedColorimetry.ReferenceWhite = parseInt($(this).prop('value'));
		GetColorimetry(SelectedColorimetry);
		UpdateReadingData();
	});
	$('#AdaptationMethod').change(function() {
		SelectedColorimetry.AdaptationMethod = parseInt($(this).prop('value'));
		GetColorimetry(SelectedColorimetry);
		UpdateReadingData();
	});
	$('#RGBModel').change(function() {
		SelectedColorimetry.RGBModel = parseInt($(this).prop('value'));
		SelectedColorimetry.RGBGamma = RGBColorSpace[SelectedColorimetry.RGBModel].GammaID;
		GetColorimetry(SelectedColorimetry);
		$("#RGBGamma").val(Colorimetry.RGBModel.GammaID);
		$("#RGBGamma").selectpicker("refresh");
		UpdateReadingData();
	});
	$('#RGBGamma').change(function() {
		SelectedColorimetry.RGBGamma = parseInt($(this).prop('value'));
		GetColorimetry(SelectedColorimetry);
		UpdateReadingData();
	});
	$('#Scaling').change(function() {
		SelectedColorimetry.Scaling = $(this).val();
		UpdateReadingData();
	});

	// Sensor table
	//
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

	// Reading table
	//
	$('#ReadingTable').bootstrapTable('destroy').bootstrapTable({
		columns: [{
			field: 'Settings',
			title: 'Settings',
			align: 'left'
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

	// Protocol table
	//
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
			field: 'Settings',
			title: 'Settings',
			align: 'left'
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

	// Logging table
	//
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

	trigger();

	function trigger() {
		$("#BroadbandLED").fadeOut();
		$("#RGBLED").fadeOut();
		$("#MonochromaticLED").fadeOut();
		ToggleState('enable');
		$('select').selectpicker();

		// System settings
		//
		// Form: Illuminant type
		for (var i in IlluminantType) {
			if (IlluminantType.hasOwnProperty(i)) {
				$("#IlluminantType").append("<option value='"+i+"' data-subtext='"+IlluminantType[i].Note+"'>"+IlluminantType[i].Name+"</option>");
			}
		}
		// Default value: "Incandescent lamp (Tungsten Halogen)"
		$("#IlluminantType").val(0);
		$("#IlluminantType").selectpicker("refresh");
		SelectedSystem.IlluminantType = $('#IlluminantType').val();






		// Form: Illuminant
		// Type: Spectral data import
		var OptGroup="<optgroup label='Spectral data import'>";
		for (var i in IlluminantSpectralData) {
			if (IlluminantSpectralData.hasOwnProperty(i) && IlluminantSpectralData[i].Type == 'Spectral data import') {
				OptGroup+="<option value='"+i+"' data-subtext='"+IlluminantSpectralData[i].Note+"'>"+IlluminantSpectralData[i].Name+"</option>";
			}
		}
		OptGroup+="</optgroup>";
		$("#Illuminant").append(OptGroup);

		// Type: CIE standard illuminant
		var OptGroup="<optgroup label='CIE standard illuminant'>";
		for (var i in IlluminantSpectralData) {
			if (IlluminantSpectralData.hasOwnProperty(i) && IlluminantSpectralData[i].Type == 'CIE standard illuminant') {
				OptGroup+="<option value='"+i+"' data-subtext='2°: "+IlluminantSpectralData[i].CIE1931StdObs.CCT+" K , 10°: "+IlluminantSpectralData[i].CIE1964StdObs.CCT+" K - "+IlluminantSpectralData[i].Note+"'>"+IlluminantSpectralData[i].Name+"</option>";
			}
		}
		OptGroup+="</optgroup>";
		$("#Illuminant").append(OptGroup);
		// Type: Broadband LED
		var OptGroup="<optgroup label='Broadband LED'>";
		for (var i in IlluminantSpectralData) {
			if (IlluminantSpectralData.hasOwnProperty(i) && IlluminantSpectralData[i].Type == 'Broadband LED') {
				OptGroup+="<option value='"+i+"' data-subtext='2°: "+IlluminantSpectralData[i].CIE1931StdObs.CCT+" K , 10°: "+IlluminantSpectralData[i].CIE1964StdObs.CCT+" K - "+IlluminantSpectralData[i].Note+"'>"+IlluminantSpectralData[i].Name+"</option>";
			}
		}
		OptGroup+="</optgroup>";
		$("#Illuminant").append(OptGroup);
		// Type: Incandescent lamp
		var OptGroup="<optgroup label='Incandescent lamp'>";
		for (var i in IlluminantSpectralData) {
			if (IlluminantSpectralData.hasOwnProperty(i) && IlluminantSpectralData[i].Type == 'Incandescent lamp') {
				OptGroup+="<option value='"+i+"' data-subtext='2°: "+IlluminantSpectralData[i].CIE1931StdObs.CCT+" K , 10°: "+IlluminantSpectralData[i].CIE1964StdObs.CCT+" K - "+IlluminantSpectralData[i].Note+"'>"+IlluminantSpectralData[i].Name+"</option>";
			}
		}
		OptGroup+="</optgroup>";
		$("#Illuminant").append(OptGroup);
		// Default value: "D50"
		$("#Illuminant").val(3);
		$("#Illuminant").selectpicker('refresh');
		SelectedSystem.Illuminant = parseInt($('#Illuminant').prop('value'));






		// Form: Beam angle
		for (var i in Irradiation) {
			if (Irradiation.hasOwnProperty(i)) {
				$("#BeamAngle").append("<option value='"+i+"' data-subtext='"+Irradiation[i].Note+"'>"+Irradiation[i].Name+"</option>");
			}
		}
		// Default value: "180 [°]"
		$("#BeamAngle").val(0);
		$("#BeamAngle").selectpicker("refresh");
		SelectedSystem.Irradiation = parseInt($('#BeamAngle').prop('value'));

		// Form: Cuvette thickness
		for (var i in Cuvette) {
			if (Cuvette.hasOwnProperty(i)) {
				$("#CuvetteThickness").append("<option value='"+i+"' data-subtext='"+Cuvette[i].Note+"'>"+Cuvette[i].Name+"</option>");
			}
		}
		// Default value: "10 [mm]"
		$("#CuvetteThickness").val(0);
		$("#CuvetteThickness").selectpicker("refresh");
		SelectedSystem.Cuvette = parseInt($('#CuvetteThickness').prop('value'));

		// Form: Sensor
		for (var i in Sensor) {
			if (Sensor.hasOwnProperty(i)) {
				$("#Sensor").append("<option value='"+i+"' data-subtext='"+Sensor[i].Note+"'>"+Sensor[i].Name+"</option>");
			}
		}
		// Default value: "smartSpectroMeter"
		$("#Sensor").val(0);
		$("#Sensor").selectpicker("refresh");
		SelectedSystem.Sensor = parseInt($('#Sensor').prop('value'));

		GetSystem(SelectedSystem);

		// Measurement settings
		//
		// Form: Measurement mode
		for (var i in MeasurementMode) {
			if (MeasurementMode.hasOwnProperty(i)) {
				$("#MeasurementMode").append("<option value='"+i+"' data-subtext='"+MeasurementMode[i].Note+"'>"+MeasurementMode[i].Name+"</option>");
			}
		}
		$("#MeasurementMode").val(0);
		$("#MeasurementMode").selectpicker("refresh");
		SelectedMeasurement.Mode = parseInt($('#MeasurementMode').prop('value'));

		// Form: Color scale
		for (var i in ColorIndex) {
			if (ColorIndex.hasOwnProperty(i)) {
				$("#ColorScale").append("<option value='"+i+"' data-subtext='"+ColorIndex[i].DeterminationMethod+"'>"+ColorIndex[i].Name+"</option>");
			}
		}
		// Default value: "None"
		$("#ColorScale").val(0);
		$("#ColorScale").selectpicker("refresh");
		SelectedMeasurement.ColorScale = parseInt($('#ColorScale').prop('value'));

		// Form: Chart
		for (var i in ChartType) {
			if (ChartType.hasOwnProperty(i)) {
				$("#Chart").append("<option value='"+i+"' data-subtext='"+ChartType[i].Note+"'>"+ChartType[i].Name+"</option>");
			}
		}
		$("#Chart").val(3);
		$("#Chart").selectpicker("refresh");
		SelectedMeasurement.Chart = $('#Chart').val();

		GetMeasurement(SelectedMeasurement);

		// Spectral data import settings
		//
		// Form: Spectral data import file
		SelectedSpectralDataImport.SPDFile = parseInt($('#SPDFile').prop('value'));

		// Form: Spectral power distribution input
		for (var i in SPDInput) {
			if (SPDInput.hasOwnProperty(i)) {
				$("#SPDInput").append("<option value='"+i+"' data-subtext='"+SPDInput[i].Note+"'>"+SPDInput[i].Name+"</option>");
			}
		}
		$("#SPDInput").val(0);
		$("#SPDInput").selectpicker("refresh");
		SelectedSpectralDataImport.SPDInput = parseInt($('#SPDInput').prop('value'));

		// Form: Wavelength increment
		for (var i in SPDWaveLengthIncrement) {
			if (SPDWaveLengthIncrement.hasOwnProperty(i)) {
				$("#SPDWaveLengthIncrement").append("<option value='"+i+"' data-subtext='"+SPDWaveLengthIncrement[i].Note+"'>"+SPDWaveLengthIncrement[i].Name+"</option>");
			}
		}
		$("#SPDWaveLengthIncrement").val(0);
		$("#SPDWaveLengthIncrement").selectpicker("refresh");
		SelectedSpectralDataImport.SPDWaveLengthIncrement = parseInt($('#SPDWaveLengthIncrement').prop('value'));

		// Form: Baseline
		SelectedSpectralDataImport.Baseline = parseFloat($('#Baseline').prop('value'));

		// Form: Baseline smoothing
		for (var i in BaselineSmoothing) {
			if (BaselineSmoothing.hasOwnProperty(i)) {
				$("#BaselineSmoothing").append("<option value='"+i+"' data-subtext='"+BaselineSmoothing[i].Note+"'>"+BaselineSmoothing[i].Name+"</option>");
			}
		}
		$("#BaselineSmoothing").val(0);
		$("#BaselineSmoothing").selectpicker("refresh");
		SelectedSpectralDataImport.BaselineSmoothing = parseInt($('#BaselineSmoothing').prop('value'));

		GetSpectralDataImport(SelectedSpectralDataImport);

		// Colorimetry settings
		//
		// Form: Standard observer
		for (var i in StandardObserver) {
			if (StandardObserver.hasOwnProperty(i)) {
				$("#Observer").append("<option value='"+i+"' data-subtext='"+StandardObserver[i].Note+"'>"+StandardObserver[i].Name+"</option>");
			}
		}
		// Default value: "CIE 1931 standard observer (2°)"
		$("#Observer").val(0);
		$("#Observer").selectpicker("refresh");
		SelectedColorimetry.Observer = parseInt($('#Observer').prop('value'));

		// Form: Optical path length
		SelectedColorimetry.ReferenceCellPathLength = parseFloat($('#ReferenceCellPathLength').prop('value'));

		// Form: Reference white
		// Type: CIE standard illuminant
		var OptGroup="<optgroup label='CIE standard illuminant'>";
		for (var i in IlluminantSpectralData) {
			if (IlluminantSpectralData.hasOwnProperty(i) && IlluminantSpectralData[i].Type == 'CIE standard illuminant') {
				OptGroup+="<option value='"+i+"' data-subtext='2°: "+IlluminantSpectralData[i].CIE1931StdObs.CCT+" K , 10°: "+IlluminantSpectralData[i].CIE1964StdObs.CCT+" K - "+IlluminantSpectralData[i].Note+"'>"+IlluminantSpectralData[i].Name+"</option>";
			}
		}
		OptGroup+="</optgroup>";
		$("#ReferenceWhite").append(OptGroup);
		// Default value: "C"
		$("#ReferenceWhite").val(2);
		$("#ReferenceWhite").selectpicker('refresh');
		SelectedColorimetry.ReferenceWhite = parseInt($('#ReferenceWhite').prop('value'));

		// Form: Adaptation method
		for (var i in ChromaticAdaptation) {
			if (ChromaticAdaptation.hasOwnProperty(i)) {
				$("#AdaptationMethod").append("<option value='"+i+"' data-subtext='"+ChromaticAdaptation[i].Note+"'>"+ChromaticAdaptation[i].Name+"</option>");
			}
		}
		// Default value: "Bradford"
		$("#AdaptationMethod").val(0);
		$("#AdaptationMethod").selectpicker("refresh");
		SelectedColorimetry.AdaptationMethod = parseInt($('#AdaptationMethod').prop('value'));

		// Form: RGB model
		for (var i in RGBColorSpace) {
			if (RGBColorSpace.hasOwnProperty(i)) {
				$("#RGBModel").append("<option value='"+i+"' data-subtext='Reference: "+RGBColorSpace[i].Reference+", Gamma: "+RGBColorSpace[i].Gamma+", "+RGBColorSpace[i].Note+"'>"+RGBColorSpace[i].Name+"</option>");
			}
		}
		// Default value: "sRGB"
		$("#RGBModel").val(14);
		$("#RGBModel").selectpicker("refresh");
		SelectedColorimetry.RGBModel = parseInt($('#RGBModel').prop('value'));

		// Form: RGB gamma
		for (var i in RGBGamma) {
			if (RGBGamma.hasOwnProperty(i)) {
				$("#RGBGamma").append("<option value='"+i+"' data-subtext=''>"+RGBGamma[i].Name+"</option>");
			}
		}
		// Default value: "sRGB"
		$("#RGBGamma").val(RGBColorSpace[SelectedColorimetry.RGBModel].GammaID);
		$("#RGBGamma").selectpicker("refresh");
		SelectedColorimetry.RGBGamma = parseInt($('#RGBGamma').prop('value'));

		// Form: Scale values
		for (var i in Scaling) {
			if (Scaling.hasOwnProperty(i)) {
				var ScalingNote = Scaling[i].Note;
				if (Scaling[i].Name != "None") {
					ScalingNote += " - Unchecked (Default): "+Scaling[i].Range.UnScaled+"; Checked: "+Scaling[i].Range.Scaled;
				}
				$("#Scaling").append("<option value='"+i+"' data-subtext='"+ScalingNote+"'>"+Scaling[i].Name+"</option>");
			}
		}
		// Default value: ""
		$("#Scaling").selectpicker("refresh");
		SelectedColorimetry.Scaling = $('#Scaling').val();

		GetColorimetry(SelectedColorimetry);
	};

	function ToggleState(state) {
		for (i = 7; i < 9; i++) {
			var switchid = "#switch_" + i;
			$(switchid).bootstrapToggle(state);
		}
		for (i = 0; i < 32; i++) {
			var switchid = "#ledswitch_" + i;
			var PWMDimValue = IlluminantData[i].Channel.DimValue;
			$(switchid).bootstrapToggle(state)
			$(switchid+"_slider").slider();
			$(switchid+"_slider").slider('setAttribute', 'max', 4095);
			$(switchid+"_slider").slider('setAttribute', 'min', 0);
			$(switchid+"_slider").slider('setAttribute', 'step', 1);
			$(switchid+"_slider").slider('setValue', PWMDimValue);
//			$(switchid+"_slider").slider('refresh');

			if (state=="enable") {
				if ($(switchid).prop('checked')===true) {
					$(switchid+"_slider").slider("enable");
				} else {
					$(switchid+"_slider").slider("disable");
				}
			} else {
				$(switchid+"_slider").slider(state);
			}
		}
	};

	function LedSwitch(SwitchID,Channel) {
		var state;
		swaction = 1;

		if ($("#"+SwitchID).prop('checked')===true) {
			$("#"+SwitchID+"_slider").slider("enable");
			var SliderValue = $("#"+SwitchID+"_slider").slider('getValue');

//console.log(SwitchID,Channel,SliderValue);

			$.get('./control?cmd='+Channel.ID+','+Channel.OutputPin+','+SliderValue, function(data, status) {
//				console.log(data);
//				console.log(status);
			});
			state = 1;
		} else {

//console.log(SwitchID,Channel);
			$("#"+SwitchID+"_slider").slider("disable")
			$.get('./control?cmd='+Channel.ID+','+Channel.OutputPin+',0', function(data, status) {
//				console.log(data);
//				console.log(status);
			});
			state = 0;
		}
	return(state);
	};

	function ResetReadingData() {
		for (i = 4; i < 17; i++) {
			ReadingData[i].ValueReference='';
			ReadingData[i].ValueSample='';
			ReadingData[i].ColorDifference='';
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
			ReadingData[i].ValueSample='';
			ReadingData[i].ColorDifference='';
		}
		$('#ReadingTable').bootstrapTable('load', ReadingData);
		SampleLightIntensity = {};
		SampleTransmission = {};
		SampleAbsorbance = {};
		SampleSAC = {};
		SampleXYZ = {};
		SampleLab = {};
	};
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
					'Settings': ReadingData[i].Settings,
					'IlluminantWavelength': ReadingData[i].IlluminantWavelength,
					'BeamAngle': ReadingData[i].BeamAngle,
					'Thickness': ReadingData[i].Thickness,
					'Readings': ReadingData[i].Readings,
					'ReadingsReference': ReadingData[i].ReadingsReference,
					'ValueReference': ReadingData[i].ValueReference,
					'ValueSample': ReadingData[i].ValueSample,
					'ValueSpectrum': ReadingData[i].ValueSpectrum,
					'ColorDifference': ReadingData[i].ColorDifference
			}];
			$('#ProtocolTable').bootstrapTable('append', ProtocolData);
		};
	};
	function AppendLogData() {
		LogData = [{
				'Timestamp': new Date().toLocaleString(),
				'LED': $('#switch_6').prop('checked'),
				'Intensity': SensorData[0].MeasuredValue,
				'CIE-XYZ': SensorData[1].MeasuredValue,
				'CIE-L*a*b*': SensorData[3].MeasuredValue,
				'CCT': SensorData[7].MeasuredValue
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
//		SensorData[8]['MeasuredValue'] = Round(XYZ2DominantWavelength(SensorXYZ), 1);
//		SensorData[9]['MeasuredValue'] = printObject(NearestColors(SensorXYZ));

		$('#SensorTable').bootstrapTable('load', SensorData);
//		DrawChart(SensorRGB, SensorxyY, SensorLab);
	};
	function UpdateReadingData() {

		if (SampleMode == 'Empty Sample') {
			EmptySampleLightIntensity = BaselineSubtractionLightIntensity(EmptySampleLightIntensity);
			EmptySampleTransmission = LightIntensity2Transmission(EmptySampleLightIntensity, EmptySampleLightIntensity);
			EmptySampleAbsorbance = Transmission2Absorbance(EmptySampleTransmission);
			EmptySampleSAC = Absorbance2SAC(EmptySampleAbsorbance);
			EmptySampleXYZ = Transmission2XYZ(EmptySampleLightIntensity, EmptySampleTransmission);
//			EmptySampleXYZ = ChromaticAdaptationXYZ(EmptySampleXYZ);
			EmptySamplexyY = XYZ2xyY(EmptySampleXYZ);
			EmptySampleRGB = XYZ2RGB(EmptySampleXYZ);
			EmptySampleLab = XYZ2Lab(EmptySampleXYZ);
			EmptySampleLuv = XYZ2Luv(EmptySampleXYZ);
			EmptySampleHunterLab = XYZ2HunterLab(EmptySampleXYZ);
			EmptySampleCCT.Robertson = XYZ2CCT_Robertson(EmptySampleXYZ);
			EmptySampleCCT.McCamy = XYZ2CCT_McCamy(EmptySampleXYZ);
			EmptySampleDominantWavelength = XYZ2DominantWavelength(EmptySampleXYZ);
			EmptySampleNearestColors = NearestColors(EmptySampleXYZ, EmptySampleLab);

			ReadingData[4].Settings = printSettings();

			ReadingData[4].ValueReference = printObject(EmptySampleLightIntensity);
			ReadingData[5].ValueReference = printObject(EmptySampleTransmission);
			ReadingData[6].ValueReference = printObject(EmptySampleAbsorbance);
			ReadingData[7].ValueReference = printObject(EmptySampleSAC);
			ReadingData[8].ValueReference = printObject(ScaleXYZ(EmptySampleXYZ));
			ReadingData[9].ValueReference = printObject(ScalexyY(EmptySamplexyY));
			ReadingData[10].ValueReference = printObject(EmptySampleLab);
			ReadingData[11].ValueReference = printObject(EmptySampleLuv);
			ReadingData[12].ValueReference = printObject(EmptySampleHunterLab);
			ReadingData[13].ValueReference = printObject(ScaleRGB(EmptySampleRGB));
			ReadingData[14].ValueReference = printObject(EmptySampleCCT);
			ReadingData[15].ValueReference = Round(EmptySampleDominantWavelength, 1);
			ReadingData[16].ValueReference = printObject(EmptySampleNearestColors);
			DrawChart(EmptySampleRGB, EmptySamplexyY, EmptySampleLab);
		}
		if (SampleMode == 'Sample') {
//			SampleLightIntensity = Randomize(SampleLightIntensity);
			SampleLightIntensity = BaselineSubtractionLightIntensity(SampleLightIntensity);
			SampleTransmission = LightIntensity2Transmission(EmptySampleLightIntensity, SampleLightIntensity);
			SampleAbsorbance = Transmission2Absorbance(SampleTransmission);
			SampleSAC = Absorbance2SAC(SampleAbsorbance);
			SampleXYZ = Transmission2XYZ(EmptySampleLightIntensity, SampleTransmission);
//			SampleXYZ = ChromaticAdaptationXYZ(SampleXYZ);
			SamplexyY = XYZ2xyY(SampleXYZ);
			SampleRGB = XYZ2RGB(SampleXYZ);
			SampleLab = XYZ2Lab(SampleXYZ);
			SampleLuv = XYZ2Luv(SampleXYZ);
			SampleHunterLab = XYZ2HunterLab(SampleXYZ);
			SampleCCT.Robertson = XYZ2CCT_Robertson(SampleXYZ);
			SampleCCT.McCamy = XYZ2CCT_McCamy(SampleXYZ);
			SampleDominantWavelength = XYZ2DominantWavelength(SampleXYZ);
			SampleNearestColors = NearestColors(SampleXYZ, SampleLab);

			ReadingData[4].ValueSample = printObject(SampleLightIntensity);
			ReadingData[5].ValueSample = printObject(SampleTransmission);
			ReadingData[6].ValueSample = printObject(SampleAbsorbance);
			ReadingData[7].ValueSample = printObject(SampleSAC);
			ReadingData[8].ValueSample = printObject(ScaleXYZ(SampleXYZ));
			ReadingData[9].ValueSample = printObject(ScalexyY(SamplexyY));
			ReadingData[10].ValueSample = printObject(SampleLab);
			ReadingData[11].ValueSample = printObject(SampleLuv);
			ReadingData[12].ValueSample = printObject(SampleHunterLab);
			ReadingData[13].ValueSample = printObject(ScaleRGB(SampleRGB));
			ReadingData[14].ValueSample = printObject(SampleCCT);
			ReadingData[15].ValueSample = Round(SampleDominantWavelength, 1);
			ReadingData[16].ValueSample = printObject(SampleNearestColors);

			DrawChart(SampleRGB, SamplexyY, SampleLab);
		}
		if (SampleMode == 'Spectrum') {
			SpectrumLightIntensity = BaselineSubtractionLightIntensity(SpectrumLightIntensity);
//			SampleTransmission = LightIntensity2Transmission(EmptySampleLightIntensity, SampleLightIntensity);
			SpectrumAbsorbance = Transmission2Absorbance(SpectrumLightIntensity, SpectrumTransmission);
			SpectrumSAC = Absorbance2SAC(SpectrumAbsorbance);
			SpectrumXYZ = Transmission2XYZ(SpectrumLightIntensity, SpectrumTransmission);
//			SpectrumXYZ = ChromaticAdaptationXYZ(SpectrumXYZ);
			SpectrumxyY = XYZ2xyY(SpectrumXYZ);
			SpectrumRGB = XYZ2RGB(SpectrumXYZ);
			SpectrumLab = XYZ2Lab(SpectrumXYZ);
			SpectrumLuv = XYZ2Luv(SpectrumXYZ);
			SpectrumHunterLab = XYZ2HunterLab(SampleXYZ);
			SpectrumCCT.Robertson = XYZ2CCT_Robertson(SpectrumXYZ);
			SpectrumCCT.McCamy = XYZ2CCT_McCamy(SpectrumXYZ);
			SpectrumDominantWavelength = XYZ2DominantWavelength(SpectrumXYZ, 1);
			SpectrumNearestColors = NearestColors(SpectrumXYZ, SpectrumLab);

			ReadingData[4].ValueSpectrum = printObject(SpectrumLightIntensity);
			ReadingData[5].ValueSpectrum = printObject(SpectrumTransmission);
			ReadingData[6].ValueSpectrum = printObject(SpectrumAbsorbance);
			ReadingData[7].ValueSpectrum = printObject(SpectrumSAC);
			ReadingData[8].ValueSpectrum = printObject(ScaleXYZ(SpectrumXYZ));
			ReadingData[9].ValueSpectrum = printObject(ScalexyY(SpectrumxyY));
			ReadingData[10].ValueSpectrum = printObject(SpectrumLab);
			ReadingData[11].ValueSpectrum = printObject(SpectrumLuv);
			ReadingData[12].ValueSpectrum = printObject(SpectrumHunterLab);
			ReadingData[13].ValueSpectrum = printObject(ScaleRGB(SpectrumRGB));
			ReadingData[14].ValueSpectrum = printObject(SpectrumCCT);
			ReadingData[15].ValueSpectrum = Round(SpectrumDominantWavelength);
			ReadingData[16].ValueSpectrum = printObject(SpectrumNearestColors);

			DrawChart(SpectrumRGB, SpectrumxyY, SpectrumLab);
		}

		let Difference_CIELAB = {};
		if (!isEmpty(EmptySampleLab) && !isEmpty(SampleLab)) {
			Difference_CIELAB['<var>CIE1976 ΔE<sup>*</sup><sub>ab</sub></var>'] = DeltaE1976(EmptySampleLab, SampleLab);
			Difference_CIELAB['<var>CIE1994 ΔE<sup>*</sup><sub>94</sub></var>'] = DeltaE1994(EmptySampleLab, SampleLab);
			Difference_CIELAB['<var>CIE2000 ΔE<sup>*</sup><sub>00</sub></var>'] = DeltaE2000(EmptySampleLab, SampleLab);
			ReadingData[10].ColorDifference=printObject(Difference_CIELAB);
		} else {
			ReadingData[10].ColorDifference='';
		}
		$('#ReadingTable').bootstrapTable('load', ReadingData);
	};

	function DrawChart(RGB, xyY, Lab) {
		// ID: 0
		// Name: "Spectral Power Distribution"
		// Note: "Intensity of incident light ( I0 ) and/or transmitted light ( IT )"
		//
		if (Measurement.ChartID.includes('0')) {
			if (Measurement.Mode.Name == "Transmittance" || Measurement.Mode.Name == "Reflectance") {
				var IlluminantSPD = window[System.Illuminant.SPD];
				IlluminantSPD = LightIntensity2NormalizedLightIntensity(IlluminantSPD);

				var ReferenceSPD = window[Colorimetry.ReferenceWhite.SPD];
				ReferenceSPD = LightIntensity2NormalizedLightIntensity(ReferenceSPD);

				var EmptySampleSPD = LightIntensity2NormalizedLightIntensity(EmptySampleLightIntensity);
				var SampleSPD = LightIntensity2NormalizedLightIntensity(SampleLightIntensity);

				// Create data table
				var SPDChartData = new google.visualization.DataTable();
				SPDChartData.addColumn('number', '');
				SPDChartData.addColumn('number', 'Empty Sample');
				SPDChartData.addColumn('number', 'Sample');
				SPDChartData.addColumn('number', 'Illuminant');
				SPDChartData.addColumn('number', 'Reference');

				for (var i in EmptySampleSPD) {
					if (EmptySampleSPD.hasOwnProperty(i)) {
						SPDChartData.addRows([
							[parseFloat(i), parseFloat(EmptySampleSPD[i]), null, null, null],
							]);
					}
				}
				for (var i in SampleSPD) {
					if (SampleSPD.hasOwnProperty(i)) {
						SPDChartData.addRows([
							[parseFloat(i), null, parseFloat(SampleSPD[i]), null, null],
							]);
					}
				}
				for (var i in IlluminantSPD) {
					if (IlluminantSPD.hasOwnProperty(i)) {
						SPDChartData.addRows([
							[parseFloat(i), null , null, parseFloat(IlluminantSPD[i]), null],
							]);
					}
				}
				for (var i in ReferenceSPD) {
					if (ReferenceSPD.hasOwnProperty(i)) {
						SPDChartData.addRows([
							[parseFloat(i), null , null, null, parseFloat(ReferenceSPD[i])],
							]);
					}
				}

				// Define chart options
				let SPDChartOptions = {
					chartArea:{left:100,top:50,width:800,height:500},
					width: '100%',
					height: 600,
//						hAxis: {title: 'λ [nm]', minValue: 200, maxValue: 1200},
					hAxis: {title: 'λ [nm]'},
					vAxes: {
//							0: {title: 'Absolute Intensity [35 counts / μW/cm2]', viewWindow: {min: 0}, maxValue: 1.2},
//							0: {title: 'Absolute Intensity [35 counts / μW/cm2]', viewWindow: {min: 0}},
						0: {title: 'Relative Intensity', viewWindow: {min: 0, max: 1.0}}
					},
					backgroundColor: 'none',
					annotations: {
						textStyle: {
							fontSize: 11,
							opacity: 0.6
						}
					},
					tooltip: { isHtml: true },
					series: {
//							0:{targetAxisIndex: 0, type: 'line', color: 'grey', visibleInLegend: true, lineWidth: 2, curveType: 'function', pointSize: 3},
						0:{targetAxisIndex: 0, type: 'line', color: 'red', visibleInLegend: true, lineWidth: 1, curveType: 'none', pointSize: 0},
						1:{targetAxisIndex: 0, type: 'line', color: 'blue', visibleInLegend: true, lineWidth: 1, curveType: 'function', pointSize: 0},
						2:{targetAxisIndex: 0, type: 'line', color: 'green', visibleInLegend: true, lineWidth: 1, curveType: 'none', pointSize: 0},
						3:{targetAxisIndex: 0, type: 'line', color: 'orange', visibleInLegend: true, lineWidth: 1, curveType: 'none', pointSize: 0}
					}
				};

				// Create columns array
				var columns = [];
				// Display these data series by default
				var defaultSeries = [1, 2];
				for (var i = 0; i < SPDChartData.getNumberOfColumns(); i++) {
					if (i == 0 || defaultSeries.indexOf(i) > -1) {
						// If the column is the domain column or in the default list, display the series
						columns.push(i);
					} else {
						// Otherwise, hide it
						columns.push({
							label: SPDChartData.getColumnLabel(i),
							type: SPDChartData.getColumnType(i),
							sourceColumn: i,
							calc: function () {
								return null;
							}
						});
					}
					if (i > 0) {
						// Backup the default color (if set)
						SPDChartOptions.series[i-1].backupColor = SPDChartOptions.series[i-1].color;
						if (defaultSeries.indexOf(i) == -1) {
							// Grey out the legend entry
							SPDChartOptions.series[i-1].color = '#CCCCCC';
						}
					}
				}

				// Initialize and draw chart, passing in some options.
				document.getElementById('SPDChartHeading').innerHTML = 'Spectral Power Distribution';
				document.getElementById('SPDChartSubHeading').innerHTML = 'd='+System.Cuvette.Thickness+' [cm], B°='+System.Irradiation.BeamAngle+' [°]';
				var SPDChart = new google.visualization.LineChart(document.getElementById('SPDChart'));

				// Create a view with the default columns
				var SPDChartDataView = new google.visualization.DataView(SPDChartData);
				SPDChartDataView.setColumns(columns);
				SPDChart.draw(SPDChartDataView, SPDChartOptions);

				// This two lines are the ones that do the magic to load the background image to the proper chart position
				var boundingBox = SPDChart.getChartLayoutInterface().getChartAreaBoundingBox(); 
				$('#SPDChartBackground').css('background-image', "url('"+AssetsPath+"/images/Spectrum.png')").css('background-repeat', 'no-repeat').css('background-position', boundingBox.left + "px " + boundingBox.top + "px").css('background-size', boundingBox.width + "px " + boundingBox.height + "px");

				// Event listener function to toggle data series
				function showHideSeries () {
					var sel = SPDChart.getSelection();
					// If selection length is 0, we deselected an element
					if (sel.length > 0) {
						// If row is undefined, we clicked on the legend
						if (sel[0].row == null) {
							var col = sel[0].column;
							if (typeof(columns[col]) == 'number') {
								var src = columns[col];
								// Hide the data series
								columns[col] = {
									label: SPDChartData.getColumnLabel(src),
									type: SPDChartData.getColumnType(src),
									sourceColumn: src,
									calc: function () {
										return null;
									}
								};
								// Grey out the legend entry
								SPDChartOptions.series[src - 1].color = '#CCCCCC';
							}
							else {
								var src = columns[col].sourceColumn;
								// Show the data series
								columns[col] = src;
								SPDChartOptions.series[src - 1].color = SPDChartOptions.series[src - 1].backupColor;
							}
							var SPDChartDataView = new google.visualization.DataView(SPDChartData);
							SPDChartDataView.setColumns(columns);
							SPDChart.draw(SPDChartDataView, SPDChartOptions);
						}
					}
				}
				// Event listener to toggle data series
				google.visualization.events.addListener(SPDChart, 'select', showHideSeries);

			} else if (Measurement.Mode.Name == 'Emission') {
				var IlluminantSPD = window[System.Illuminant.SPD];
				IlluminantSPD = LightIntensity2NormalizedLightIntensity(IlluminantSPD);

				var ReferenceSPD = window[Colorimetry.ReferenceWhite.SPD];
				ReferenceSPD = LightIntensity2NormalizedLightIntensity(ReferenceSPD);

				var EmptySampleSPD = LightIntensity2NormalizedLightIntensity(EmptySampleLightIntensity);
				var SampleSPD = LightIntensity2NormalizedLightIntensity(SampleLightIntensity);

				var SPDChartData = new google.visualization.DataTable();
				SPDChartData.addColumn('number', '');
				SPDChartData.addColumn('number', 'Emission');
				for (var i in EmptySampleSPD) {
					if (EmptySampleSPD.hasOwnProperty(i)) {
						SPDChartData.addRows([
							[parseFloat(i), parseFloat(EmptySampleSPD[i])],
							]);
					}
				}
				let SPDChartOptions = {
					chartArea:{left:100,top:50,width:800,height:500},
					width: '100%',
					height: 600,
	//				hAxis: {title: 'λ [nm]', minValue: 200, maxValue: 1200},
					hAxis: {title: 'λ [nm]'},
					vAxes: {
	//					0: {title: 'Absolute Intensity [35 counts / μW/cm2]', viewWindow: {min: 0}, maxValue: 1.2},
	//					0: {title: 'Absolute Intensity [35 counts / μW/cm2]', viewWindow: {min: 0}},
						0: {title: 'Relative Intensity', viewWindow: {min: 0, max: 1.0}}
					},
					backgroundColor: 'none',
					annotations: {
						textStyle: {
							fontSize: 11,
							opacity: 0.6
						}
					},
					tooltip: { isHtml: true },
					series: {
	//					0:{targetAxisIndex: 0, type: 'line', color: 'grey', visibleInLegend: true, lineWidth: 2, curveType: 'function', pointSize: 3},
						0:{targetAxisIndex: 0, type: 'line', color: 'red', visibleInLegend: true, lineWidth: 1, curveType: 'none', pointSize: 0},
						1:{targetAxisIndex: 0, type: 'line', color: 'blue', visibleInLegend: true, lineWidth: 1, curveType: 'function', pointSize: 0},
						2:{targetAxisIndex: 0, type: 'line', color: 'green', visibleInLegend: true, lineWidth: 1, curveType: 'none', pointSize: 0},
						3:{targetAxisIndex: 0, type: 'line', color: 'orange', visibleInLegend: true, lineWidth: 1, curveType: 'none', pointSize: 0}
					}
				};

				document.getElementById('SPDChartHeading').innerHTML = 'Spectral Power Distribution';
				document.getElementById('SPDChartSubHeading').innerHTML = 'd='+System.Cuvette.Thickness+' [cm], B°='+System.Irradiation.BeamAngle+' [°]';

				var SPDChart = new google.visualization.LineChart(document.getElementById('SPDChart'));
				SPDChart.draw(SPDChartData, SPDChartOptions);
				// This two lines are the ones that do the magic to load the background image to the proper chart position
				var boundingBox = SPDChart.getChartLayoutInterface().getChartAreaBoundingBox(); 
				$('#SPDChartBackground').css('background-image', "url('"+AssetsPath+"/images/Spectrum.png')").css('background-repeat', 'no-repeat').css('background-position', boundingBox.left + "px " + boundingBox.top + "px").css('background-size', boundingBox.width + "px " + boundingBox.height + "px");
			}
		} else {
			document.getElementById('SPDChartHeading').innerHTML = "";
			document.getElementById('SPDChartSubHeading').innerHTML = "";
			document.getElementById('SPDChart').innerHTML = "";
		}

		// ID: 1
		// Name: "Spectral Transmittance"
		// Note: "Normalized intensity of light passing through the sample ( T = IT / I0 )"
		//
		if (Measurement.ChartID.includes('1') && !isEmpty(SampleTransmission)) {
			var TransmissionChartData = new google.visualization.DataTable();
			TransmissionChartData.addColumn('number', '');
			TransmissionChartData.addColumn('number', 'Sample');
			for (var i in SampleTransmission) {
				if (SampleTransmission.hasOwnProperty(i)) {
					TransmissionChartData.addRows([
						[parseFloat(i), parseFloat(SampleTransmission[i])],
						]);
				}
			}
			let TransmissionChartOptions = {
				chartArea:{left:100,top:50,width:800,height:500},
				width: '100%',
				height: 600,
//				hAxis: {title: 'λ [nm]', minValue: 200, maxValue: 1200},
				hAxis: {title: 'λ [nm]'},
				vAxes: {
//					0: {title: 'T', viewWindow: {min: 0}, maxValue: 1.2},
					0: {title: 'T', viewWindow: {min: 0}}
				},
				backgroundColor: 'none',
				annotations: {
					textStyle: {
						fontSize: 11,
						opacity: 0.6
					}
				},
				tooltip: { isHtml: true },
				series: {
//					0:{targetAxisIndex: 0, type: 'line', color: 'grey', visibleInLegend: true, lineWidth: 2, curveType: 'function', pointSize: 3},
					0:{targetAxisIndex: 0, type: 'line', color: 'blue', visibleInLegend: true, lineWidth: 1, curveType: 'none'}
				}
			};

			document.getElementById('TransmittanceChartHeading').innerHTML = 'Spectral Transmittance';
			document.getElementById('TransmittanceChartSubHeading').innerHTML = 'd='+System.Cuvette.Thickness+' [cm]';

			var TransmissionChart = new google.visualization.LineChart(document.getElementById('TransmittanceChart'));
			TransmissionChart.draw(TransmissionChartData, TransmissionChartOptions);
			// This two lines are the ones that do the magic to load the background image to the proper chart position
			var boundingBox = TransmissionChart.getChartLayoutInterface().getChartAreaBoundingBox(); 
			$('#TransmittanceChartBackground').css('background-image', "url('"+AssetsPath+"/images/Spectrum.png')").css('background-repeat', 'no-repeat').css('background-position', boundingBox.left + "px " + boundingBox.top + "px").css('background-size', boundingBox.width + "px " + boundingBox.height + "px");
		} else {
			document.getElementById('TransmittanceChartHeading').innerHTML = "";
			document.getElementById('TransmittanceChartSubHeading').innerHTML = "";
			document.getElementById('TransmittanceChart').innerHTML = "";
		}

		// ID: 2
		// Name: "Spectral Absorbance"
		// Note: "Extinction/Attenuation ( Eλ = - log ( T ) = log ( 1 / T ) = ελ * c * d )"
		//
		if (Measurement.ChartID.includes('2') && !isEmpty(SampleAbsorbance)) {
			var AbsorbanceChartData = new google.visualization.DataTable();
			AbsorbanceChartData.addColumn('number', '');
			AbsorbanceChartData.addColumn('number', 'Sample');
			for (var i in SampleAbsorbance) {
				if (SampleAbsorbance.hasOwnProperty(i)) {
					AbsorbanceChartData.addRows([
						[parseFloat(i), parseFloat(SampleAbsorbance[i])],
						]);
				}
			}
			let AbsorbanceChartOptions = {
				chartArea:{left:100,top:50,width:800,height:500},
				width: '100%',
				height: 600,
//				hAxis: {title: 'λ [nm]', minValue: 200, maxValue: 1200},
				hAxis: {title: 'λ [nm]'},
				vAxes: {
//					0: {title: 'E', viewWindow: {min: 0}, maxValue: 1.2},
//					0: {title: 'E', viewWindow: {min: 0}}
					0: {title: 'E'}
				},
				backgroundColor: 'none',
				annotations: {
					textStyle: {
						fontSize: 11,
						opacity: 0.6
					}
				},
				tooltip: { isHtml: true },
				series: {
//					0:{targetAxisIndex: 0, type: 'line', color: 'grey', visibleInLegend: true, lineWidth: 2, curveType: 'none', pointSize: 3},
					0:{targetAxisIndex: 0, type: 'line', color: 'blue', visibleInLegend: true, lineWidth: 1, curveType: 'none'}
				}
			};

			document.getElementById('AbsorbanceChartHeading').innerHTML = 'Spectral Absorbance';
			document.getElementById('AbsorbanceChartSubHeading').innerHTML = 'd='+System.Cuvette.Thickness+' [cm]';

			var AbsorbanceChart = new google.visualization.LineChart(document.getElementById('AbsorbanceChart'));
			AbsorbanceChart.draw(AbsorbanceChartData, AbsorbanceChartOptions);
			// This two lines are the ones that do the magic to load the background image to the proper chart position
			var boundingBox = AbsorbanceChart.getChartLayoutInterface().getChartAreaBoundingBox(); 
			$('#AbsorbanceChartBackground').css('background-image', "url('"+AssetsPath+"/images/Spectrum.png')").css('background-repeat', 'no-repeat').css('background-position', boundingBox.left + "px " + boundingBox.top + "px").css('background-size', boundingBox.width + "px " + boundingBox.height + "px");
		} else {
			document.getElementById('AbsorbanceChartHeading').innerHTML = "";
			document.getElementById('AbsorbanceChartSubHeading').innerHTML = "";
			document.getElementById('AbsorbanceChart').innerHTML = "";
		}

		// ID: 3
		// Name: "CIE Color"
		// Note: "CIE-Yxy/L*a*b* Chromaticity diagram"
		//
		if (Measurement.ChartID.includes('3') && !isEmpty(xyY) && !isEmpty(Lab)) {
			if (ColorScale.Name == "None") {
				var CIEChartData = new google.visualization.DataTable();
				CIEChartData.addColumn('number', '');
				CIEChartData.addColumn('number', SampleMode);
				CIEChartData.addColumn('number', 'Reference');
				CIEChartData.addColumn('number', Colorimetry.RGBModel.Name);
				CIEChartData.addColumn('number', Colorimetry.RGBModel.Name);
				CIEChartData.addColumn('number', 'Planckian locus');
				CIEChartData.addColumn({type:'number', role:'annotation'});
				CIEChartData.addColumn('number', 'Spectrum locus');
				CIEChartData.addColumn({type:'number', role:'annotation'});
				CIEChartData.addRows([
					[xyY.x, xyY.y,, null, null, null, null, null, null],
					[Colorimetry.ReferenceWhite.x, null, Colorimetry.ReferenceWhite.y, null, null, null, null, null, null],
					[Colorimetry.RGBModel.xr, null, null, Colorimetry.RGBModel.yr, null, null, null, null, null],
					[Colorimetry.RGBModel.xg, null, null, Colorimetry.RGBModel.yg, null, null, null, null, null],
					[Colorimetry.RGBModel.xb, null, null, Colorimetry.RGBModel.yb, null, null, null, null, null],
					[Colorimetry.RGBModel.xb, null, null, null, Colorimetry.RGBModel.yb, null, null, null, null],
					[Colorimetry.RGBModel.xr, null, null, null, Colorimetry.RGBModel.yr, null, null, null, null],
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
				let CIEChartOptions = {
					chartArea:{left:100,top:50,width:533,height:600},
					width: '100%',
					height: 700,
					hAxis: {title: 'x', minValue: 0, maxValue: 0.8},
					vAxis: {title: 'y', minValue: 0, maxValue: 0.9},
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

				document.getElementById('CIEChartHeading').innerHTML = 'CIE-Yxy Chromaticity Diagram (Y=1)';
				document.getElementById('CIEChartSubHeading').innerHTML = Colorimetry.Observer+', StdIlluminat='+xyY.Reference+', d='+Colorimetry.ReferenceCellPathLength+' [cm]';

				var CIEChart = new google.visualization.LineChart(document.getElementById('CIEChart'));
				CIEChart.draw(CIEChartData, CIEChartOptions);
				// This two lines are the ones that do the magic to load the background image to the proper chart position
				var boundingBox = CIEChart.getChartLayoutInterface().getChartAreaBoundingBox(); 
				$('#CIEChartBackground').css('background-image', "url('"+AssetsPath+"/images/CIE-Yxy.png')").css('background-repeat', 'no-repeat').css('background-position', boundingBox.left + "px " + boundingBox.top + "px").css('background-size', boundingBox.width + "px " + boundingBox.height + "px");
			} else {
				var CIEChartData = new google.visualization.DataTable();
				CIEChartData.addColumn('number', '');
				CIEChartData.addColumn('number', SampleMode);
				CIEChartData.addColumn({type:'string', role:'tooltip', 'p': {'html': true}});
				CIEChartData.addColumn('number', ColorScale.Name);
				CIEChartData.addColumn({type:'string', role:'tooltip', 'p': {'html': true}});

				if (!ColorScale.Value) {
					CIEChartData.addRows([
						[parseFloat(Lab.a), parseFloat(Lab.b), '<div style="background-color: ' + RGB.HEX + ' ;opacity: 100; text-align: left; min-width: 100px; padding: 8px;"><b>' + SampleMode + '</b><br><br>L: ' + Lab.L + '<br>a: ' + Lab.a + '<br>b: ' + Lab.b + '</div>', null, null],
					]);
				} else {
					CIEChartData.addRows([
						[parseFloat(Lab.a), parseFloat(Lab.b), '<div style="background-color: ' + RGB.HEX + ' ;opacity: 100; text-align: left; min-width: 100px; padding: 8px;"><b>' + SampleMode + '</b><br><br>L: ' + Lab.L + '<br>a: ' + Lab.a + '<br>b: ' + Lab.b + '<br><br>' + ColorScale.Name + ': ' + ColorScale.Value + '</div>', null, null],
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

					CIEChartData.addRows([
						[parseFloat(ReferenceColor.a), null, null, parseFloat(ReferenceColor.b), '<div style="background-color: ' + ReferenceColorRGB.HEX + ';opacity: 100; text-align: left; min-width: 100px; padding: 8px;"><b>' + ReferenceName + '</b><br><br>L: ' + ReferenceColor.L + '<br>a: ' + ReferenceColor.a + '<br>b: ' + ReferenceColor.b + '</div>'],
						]);
				});

				let CIEChartOptions = {
					chartArea:{left:100,top:50,width:600,height:600},
					width: '100%',
					height: 700,
					hAxis: {title: 'a', minValue: -150.0, maxValue: 150.0},
					vAxis: {title: 'b', minValue: -150.0, maxValue: 150.0},
					backgroundColor: 'none',
					annotations: {
						textStyle: {
							fontSize: 11,
							opacity: 0.6
						}
					},
					tooltip: { isHtml: true },
					series: {
						0:{type: 'line', color: 'grey', visibleInLegend: true, lineWidth: 0, pointShape: { type: 'star', sides: 5, dent: 0.2 }, pointSize: 18},
						1:{type: 'line', color: 'grey', visibleInLegend: true, lineWidth: ColorScale.ChartLineWidth, curveType: ColorScale.ChartCurveType, pointSize: 3}
					}
				};

//				var CIECanvas = document.getElementById("CIECanvas");
//				var CIECTX = CIECanvas.getContext("2d");
//				CIECTX = Lab2Canvas(CIECanvas, CIECTX, Lab.L);

				document.getElementById('CIEChartHeading').innerHTML = 'CIE-L*a*b* Chromaticity Diagram (L='+Round(Lab.L, 2)+')';
				document.getElementById('CIEChartSubHeading').innerHTML = Colorimetry.Observer+', StdIlluminat='+Lab.Reference+', d='+Colorimetry.ReferenceCellPathLength+' [cm]';

				var CIEChart = new google.visualization.LineChart(document.getElementById('CIEChart'));
				CIEChart.draw(CIEChartData, CIEChartOptions);
				// This two lines are the ones that do the magic to load the background image to the proper chart position
				var boundingBox = CIEChart.getChartLayoutInterface().getChartAreaBoundingBox(); 
				$('#CIEChartBackground').css('background-image', "url('"+CIECanvas.toDataURL()+"')").css('background-repeat', 'no-repeat').css('background-position', boundingBox.left + "px " + boundingBox.top + "px").css('background-size', boundingBox.width + "px " + boundingBox.height + "px");
			}
		} else {
			document.getElementById('CIEChartHeading').innerHTML = "";
			document.getElementById('CIEChartSubHeading').innerHTML = "";
			document.getElementById('CIEChart').innerHTML = "";
		}

		// ID: 4
		// Name: "RGB Color"
		// Note: "Color patch based on selected RGB model"
		//
		if (Measurement.ChartID.includes('4') && !isEmpty(RGB)) {
			document.getElementById('RGBChartHeading').innerHTML = RGB.Model+' ('+(RGB.R).toFixed(6)+', '+(RGB.G).toFixed(6)+', '+(RGB.B).toFixed(6)+')';
			document.getElementById('RGBChartSubHeading').innerHTML = RGB.Reference+', d='+Colorimetry.ReferenceCellPathLength+' [cm]';
			var RGBChart = document.getElementById('RGBChart');
			RGBChart.width = 400;
			RGBChart.height = 150;
			var RGBContext = RGBChart.getContext('2d');
			RGBContext.globalCompositeOperation = "destination-over";
			RGBContext.fillStyle = RGB.HEX;
			RGBContext.fillRect(0, 0, RGBChart.width, RGBChart.height);
			RGBContext.globalCompositeOperation = "source-over";
			RGBContext.lineWidth = 1;
			RGBContext.strokeStyle = "#d3d3d3";
			RGBContext.strokeRect(0, 0, RGBChart.width, RGBChart.height);
		} else {
			document.getElementById('RGBChartHeading').innerHTML = "";
			document.getElementById('RGBChartSubHeading').innerHTML = "";
			var RGBChart = document.getElementById('RGBChart');
			RGBChart.innerHTML = "";
			RGBChart.width = 0;
			RGBChart.height = 0;
		}
	}

	function printSettings() {
		var result;
		result = 'Illuminant type: ' + System.IlluminantType + '</br>';
		result += 'Beam angle: ' + System.Irradiation.Name + '</br>';
		result += 'Cuvette thickness: ' + System.Cuvette.Name + '</br>';
		result += 'Measurement mode: ' + Measurement.Mode.Name + '</br>';
		result += 'Sensor: ' + System.Sensor + '</br>';
		return(result);
	}

	function printObject(obj) {
		var result = '';
		var objValue;
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				objValue=`${obj[i]}`;
				var x = parseFloat(objValue); 
				if (!isNaN(x)) {
					switch(true) {
						case (i == 'Gamma'):
						case (i == 'Robertson'):
						case (i == 'McCamy'):
							objValue=x.toFixed(1);
							break;
						case (i == 'L'):
						case (i == 'a'):
						case (i == 'b'):
						case (i == 'u'):
						case (i == 'v'):
							objValue=x.toFixed(4);
							break;
						case (i == 'X'):
						case (i == 'Y'):
						case (i == 'Z'):
						case (i == 'x'):
						case (i == 'y'):
						case (i == '<var>CIE1976 ΔE<sup>*</sup><sub>ab</sub></var>'):
						case (i == '<var>CIE1994 ΔE<sup>*</sup><sub>94</sub></var>'):
						case (i == '<var>CIE2000 ΔE<sup>*</sup><sub>00</sub></var>'):
						case (i == 'R'):
						case (i == 'G'):
						case (i == 'B'):
						case (i >=0):
							objValue=x.toFixed(6);
							break;
					}
				}
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
//												SensorData[(s.Sensors[a].TaskValues[l].ValueNumber-1)].MeasuredValue=tempValue;
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
//												SensorData[(s.Sensors[a].TaskValues[l].ValueNumber-1)].MeasuredValue=tempValue;
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
//												SensorData[(s.Sensors[a].TaskValues[l].ValueNumber-1)].MeasuredValue=tempValue;
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
//												SensorData[(s.Sensors[a].TaskValues[l].ValueNumber-1)].MeasuredValue=tempValue;
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
