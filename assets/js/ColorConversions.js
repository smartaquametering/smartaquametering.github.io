// Color converting functions adapted from "CIE Color Calculator by Bruce Justin Lindbloom"
// - function Determinant3x3(m)
// - function MtxInvert3x3(m, i)
// - function MtxTranspose3x3(m)
// - function GetRGBModel(SelectedRGBModel)
// - function CheckXYZ(XYZ)
// - function XYZ2RGB(XYZ)
// - function RGB2XYZ(RGB)
// - function Compand(linear)
// - function InvCompand(companded)
// - function XYZ2xyY(XYZ)
// - function XYZ2Lab(XYZ)
// - function XYZ2Luv(XYZ)
// - function Lab2LCHab(Lab)
// - function LCHab2Lab(LCHab)
// - function Luv2LCHuv(Luv)
// - function LCHuv2Luv(LCHuv)
// - function XYZ2CCT_Robertson(XYZ)
// - function XYZ2DominantWavelength(XYZ)
// http://www.brucelindbloom.com/index.html?ColorCalculator.html
// http://www.brucelindbloom.com/javascript/ColorConv.js
// Copyright © 2001 - 2021 Bruce Justin Lindbloom. All Rights Reserved.
//
// Color delta functions adapted from "CIE-L*a*b* Color Difference Calculator by Bruce Justin Lindbloom"
// - function DeltaE1976(Lab1, Lab2)
// - function DeltaE1994(Lab1, Lab2)
// - function DeltaE2000(Lab1, Lab2)
// - function DeltaECMC(L, C)
// http://www.brucelindbloom.com/index.html?ColorDifferenceCalc.html
// http://www.brucelindbloom.com/javascript/ColorDiff.js
// Copyright © 2001 - 2021 Bruce Justin Lindbloom. All Rights Reserved.
//
// Functions by smartAquaMetering
// - function RGB2Hex({R, G, B})
// - function ChromaticAdaptationXYZ(XYZ)
// - function XYZ2HunterLab(XYZ)
// - function XYZ2CCT_McCamy(XYZ)
// smartColorimeter - Copyright © 2020-2021 by smartAquaMetering. All Rights Reserved. Licensed under GNU GPL v3 or higher..
// Based on a work at https://github.com/smartaquametering/smartPhotometer.
// For permissions beyond the scope of this license see https://github.com/smartaquametering/smartPhotometer/blob/main/LICENSE.
//
// Other useful staff:
// https://css-tricks.com/converting-color-spaces-in-javascript/ by Jon Kantner
// https://automeris.io/WebPlotDigitizer, Copyright 2010-2020 by Ankit Rohatgi <ankitrohatgi@hotmail.com>

var kE = 216.0 / 24389.0;
var kK = 24389.0 / 27.0;
var kKE = 8.0;

var System = {
		Illuminant: {},
		Irradiation: {},
		Cuvette: {}
};
var Measurement = {
		Mode: {},
		ColorScale: {}
}
var SpectralDataImport = {};
var Colorimetry = {
		ReferenceCellPathLength: 1,
		ReferenceWhite: {},
		RGBModel: {}
};

var MtxRGB2XYZ  = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};
var MtxXYZ2RGB  = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};
var MtxToRGB    = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};
var MtxFromRGB  = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};
var MtxAdaptMa  = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};
var MtxAdaptMaI = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};

var StandardObserver = {
	0:	{
			Name: "CIE 1931 standard observer (2°)",
			Standard: "CIE 15.3:2004, ASTM E308−18",
			Note: "CIE 1931 standard (colorimetric) observer for the 2 degree field of view",
			ColorMatchingFunction: "CIE1931StdObs",
			WaveLengthRange: "360 - 830 nm",
			WaveLengthIncrement: 1.0
		},
	1:	{
			Name: "CIE 1964 standard observer (10°)",
			Standard: "CIE 15.3:2004, ASTM E308−18",
			Note: "CIE 1964 standard (colorimetric) observer for the 10 degree field of view",
			ColorMatchingFunction: "CIE1964StdObs",
			WaveLengthRange: "360 - 830 nm",
			WaveLengthIncrement: 1.0
		}
}

var ChromaticAdaptation = {
	0:	{
			Name: "Bradford",
			Standard: "",
			Note: "The newest of the three methods, and is considered by most experts to be the best of them",
			MtxAdaptMa:	{
				m00:  0.8951,
				m01: -0.7502,
				m02:  0.0389,
				m10:  0.2664,
				m11:  1.7135,
				m12: -0.0685,
				m20: -0.1614,
				m21:  0.0367,
				m22:  1.0296
			}
		},
	1:	{
			Name: "Von Kries",
			Standard: "",
			Note: "A simple model formulated from the hypotheses of Johannes von Kries in 1902, known as von Kries transform/model",
			MtxAdaptMa:	{
				m00:  0.40024,
				m01: -0.22630,
				m02:  0.00000,
				m10:  0.70760,
				m11:  1.16532,
				m12:  0.00000,
				m20: -0.08081,
				m21:  0.04570,
				m22:  0.91822
			}
		},
	2:	{
			Name: "XYZ Scaling",
			Standard: "",
			Note: "Generally considered to be an inferior chromatic adaptation algorithm",
			MtxAdaptMa:	{
				m00: 1.0,
				m01: 0.0,
				m02: 0.0,
				m10: 0.0,
				m11: 1.0,
				m12: 0.0,
				m20: 0.0,
				m21: 0.0,
				m22: 1.0
			}
		},
	3:	{
			Name: "None",
			Standard: "",
			Note: "",
			MtxAdaptMa:	{
				m00: 1.0,
				m01: 0.0,
				m02: 0.0,
				m10: 0.0,
				m11: 1.0,
				m12: 0.0,
				m20: 0.0,
				m21: 0.0,
				m22: 1.0
			}
		}
}

function Determinant3x3(m)
{
	var det = m.m00 * (m.m22 * m.m11 - m.m21 * m.m12) -
			  m.m10 * (m.m22 * m.m01 - m.m21 * m.m02) +
			  m.m20 * (m.m12 * m.m01 - m.m11 * m.m02);
	return (det);
}

function MtxInvert3x3(m, i)
{
	var scale = 1.0 / Determinant3x3(m);

	i.m00 =  scale * (m.m22 * m.m11 - m.m21 * m.m12);
	i.m01 = -scale * (m.m22 * m.m01 - m.m21 * m.m02);
	i.m02 =  scale * (m.m12 * m.m01 - m.m11 * m.m02);

	i.m10 = -scale * (m.m22 * m.m10 - m.m20 * m.m12);
	i.m11 =  scale * (m.m22 * m.m00 - m.m20 * m.m02);
	i.m12 = -scale * (m.m12 * m.m00 - m.m10 * m.m02);

	i.m20 =  scale * (m.m21 * m.m10 - m.m20 * m.m11);
	i.m21 = -scale * (m.m21 * m.m00 - m.m20 * m.m01);
	i.m22 =  scale * (m.m11 * m.m00 - m.m10 * m.m01);
}

function MtxTranspose3x3(m)
{
	var v = m.m01;
	m.m01 = m.m10;
	m.m10 = v;

	v = m.m02;
	m.m02 = m.m20;
	m.m20 = v;

	v = m.m12;
	m.m12 = m.m21;
	m.m21 = v;
}

function GetSystem(SelectedSystem)
{
	System.IlluminantTypeID = SelectedSystem.IlluminantType;
	// Illuminant
		System.Illuminant.Name = IlluminantSpectralData[SelectedSystem.Illuminant].Name;
		System.Illuminant.Type = IlluminantSpectralData[SelectedSystem.Illuminant].Type;
		System.Illuminant.Standard = IlluminantSpectralData[SelectedSystem.Illuminant].Standard;
		System.Illuminant.Note = IlluminantSpectralData[SelectedSystem.Illuminant].Note;
		System.Illuminant.SPD = IlluminantSpectralData[SelectedSystem.Illuminant].SPD;
		System.Illuminant.WaveLengthIncrement = IlluminantSpectralData[SelectedSystem.Illuminant].WaveLengthIncrement;
//		System.Illuminant.CCT = IlluminantSpectralData[SelectedSystem.Illuminant][Colorimetry.Observer].CCT;
//		System.Illuminant.X = IlluminantSpectralData[SelectedSystem.Illuminant][Colorimetry.Observer].X;
//		System.Illuminant.Y = IlluminantSpectralData[SelectedSystem.Illuminant][Colorimetry.Observer].Y;
//		System.Illuminant.Z = IlluminantSpectralData[SelectedSystem.Illuminant][Colorimetry.Observer].Z;
//		System.Illuminant.x = IlluminantSpectralData[SelectedSystem.Illuminant][Colorimetry.Observer].x;
//		System.Illuminant.y = IlluminantSpectralData[SelectedSystem.Illuminant][Colorimetry.Observer].y;
	System.Irradiation.Name = Irradiation[SelectedSystem.Irradiation].Name;
	System.Irradiation.BeamAngle = Irradiation[SelectedSystem.Irradiation].BeamAngle;
	System.Cuvette.Name = Cuvette[SelectedSystem.Cuvette].Name;
	System.Cuvette.Thickness = Cuvette[SelectedSystem.Cuvette].Thickness;
	System.Sensor = Sensor[SelectedSystem.Sensor].Name;
	return(System);
}

function GetMeasurement(SelectedMeasurement)
{
	Measurement.Mode = MeasurementMode[SelectedMeasurement.Mode];
	Measurement.ColorScaleID = SelectedMeasurement.ColorScale;
	Measurement.ChartID = SelectedMeasurement.Chart;
	return(Measurement);
}

function GetSpectralDataImport(SelectedSpectralDataImport)
{
	SpectralDataImport.File = SelectedSpectralDataImport.SPDFile;
	SpectralDataImport.PowerDistributionInput = SPDInput[SelectedSpectralDataImport.SPDInput].Name;
	SpectralDataImport.WaveLengthIncrement = SPDWaveLengthIncrement[SelectedSpectralDataImport.SPDWaveLengthIncrement].WaveLengthIncrement;
	SpectralDataImport.Baseline = SelectedSpectralDataImport.Baseline;
	SpectralDataImport.BaselineSmoothing = BaselineSmoothing[SelectedSpectralDataImport.BaselineSmoothing].Factor;
	return(SpectralDataImport);
}

function GetColorimetry(SelectedColorimetry)
{

console.log(SelectedColorimetry);

	// CIE Observer
		Colorimetry.Observer = StandardObserver[SelectedColorimetry.Observer].ColorMatchingFunction;

	// CIE optical path length
		Colorimetry.ReferenceCellPathLength = SelectedColorimetry.ReferenceCellPathLength;

	// CIE Reference Illuminant
		Colorimetry.ReferenceWhite.Name = IlluminantSpectralData[SelectedColorimetry.ReferenceWhite].Name;
		Colorimetry.ReferenceWhite.Type = IlluminantSpectralData[SelectedColorimetry.ReferenceWhite].Type;
		Colorimetry.ReferenceWhite.Standard = IlluminantSpectralData[SelectedColorimetry.ReferenceWhite].Standard;
		Colorimetry.ReferenceWhite.Note = IlluminantSpectralData[SelectedColorimetry.ReferenceWhite].Note;
		Colorimetry.ReferenceWhite.SPD = IlluminantSpectralData[SelectedColorimetry.ReferenceWhite].SPD;
		Colorimetry.ReferenceWhite.WaveLengthIncrement = IlluminantSpectralData[SelectedColorimetry.ReferenceWhite].WaveLengthIncrement;
		Colorimetry.ReferenceWhite.CCT = IlluminantSpectralData[SelectedColorimetry.ReferenceWhite][Colorimetry.Observer].CCT;
		Colorimetry.ReferenceWhite.X = IlluminantSpectralData[SelectedColorimetry.ReferenceWhite][Colorimetry.Observer].X;
		Colorimetry.ReferenceWhite.Y = IlluminantSpectralData[SelectedColorimetry.ReferenceWhite][Colorimetry.Observer].Y;
		Colorimetry.ReferenceWhite.Z = IlluminantSpectralData[SelectedColorimetry.ReferenceWhite][Colorimetry.Observer].Z;
		Colorimetry.ReferenceWhite.x = IlluminantSpectralData[SelectedColorimetry.ReferenceWhite][Colorimetry.Observer].x;
		Colorimetry.ReferenceWhite.y = IlluminantSpectralData[SelectedColorimetry.ReferenceWhite][Colorimetry.Observer].y;

	// Adaptation Method
		Colorimetry.AdaptationMethod = ChromaticAdaptation[SelectedColorimetry.AdaptationMethod].Name;
		MtxAdaptMa = ChromaticAdaptation[SelectedColorimetry.AdaptationMethod].MtxAdaptMa;
		MtxInvert3x3(MtxAdaptMa, MtxAdaptMaI);

	// RGB Model
		Colorimetry.RGBModel.Name = RGBColorSpace[SelectedColorimetry.RGBModel].Name;

		Colorimetry.RGBModel.Gamma = RGBGamma[SelectedColorimetry.RGBGamma].Factor;
		Colorimetry.RGBModel.GammaID = RGBColorSpace[SelectedColorimetry.RGBModel].GammaID;

		Colorimetry.RGBModel.Reference = RGBColorSpace[SelectedColorimetry.RGBModel].Reference;
		Colorimetry.RGBModel.ReferenceWhiteID = Object.keys(IlluminantSpectralData).find(k=>IlluminantSpectralData[k].Name === Colorimetry.RGBModel.Reference);

		Colorimetry.RGBModel.xr = RGBColorSpace[SelectedColorimetry.RGBModel].Primary.xr;
		Colorimetry.RGBModel.yr = RGBColorSpace[SelectedColorimetry.RGBModel].Primary.yr;
		Colorimetry.RGBModel.xg = RGBColorSpace[SelectedColorimetry.RGBModel].Primary.xg;
		Colorimetry.RGBModel.yg = RGBColorSpace[SelectedColorimetry.RGBModel].Primary.yg;
		Colorimetry.RGBModel.xb = RGBColorSpace[SelectedColorimetry.RGBModel].Primary.xb;
		Colorimetry.RGBModel.yb = RGBColorSpace[SelectedColorimetry.RGBModel].Primary.yb;

		Colorimetry.RGBModel.Xw = IlluminantSpectralData[Colorimetry.RGBModel.ReferenceWhiteID][Colorimetry.Observer].X;
		Colorimetry.RGBModel.Yw = IlluminantSpectralData[Colorimetry.RGBModel.ReferenceWhiteID][Colorimetry.Observer].Y;
		Colorimetry.RGBModel.Zw = IlluminantSpectralData[Colorimetry.RGBModel.ReferenceWhiteID][Colorimetry.Observer].Z;

		var m = {
			m00: Colorimetry.RGBModel.xr / Colorimetry.RGBModel.yr,
			m01: Colorimetry.RGBModel.xg / Colorimetry.RGBModel.yg,
			m02: Colorimetry.RGBModel.xb / Colorimetry.RGBModel.yb,
			m10: 1.0,
			m11: 1.0,
			m12: 1.0,
			m20: (1.0 - Colorimetry.RGBModel.xr - Colorimetry.RGBModel.yr) / Colorimetry.RGBModel.yr,
			m21: (1.0 - Colorimetry.RGBModel.xg - Colorimetry.RGBModel.yg) / Colorimetry.RGBModel.yg,
			m22: (1.0 - Colorimetry.RGBModel.xb - Colorimetry.RGBModel.yb) / Colorimetry.RGBModel.yb
		};

		var mi = {
			m00: 1.0,
			m01: 0.0,
			m02: 0.0,
			m10: 0.0,
			m11: 1.0,
			m12: 0.0,
			m20: 0.0,
			m21: 0.0,
			m22: 1.0
		};

		MtxInvert3x3(m, mi);

		var sr = Colorimetry.RGBModel.Xw * mi.m00 + Colorimetry.RGBModel.Yw * mi.m01 + Colorimetry.RGBModel.Zw * mi.m02;
		var sg = Colorimetry.RGBModel.Xw * mi.m10 + Colorimetry.RGBModel.Yw * mi.m11 + Colorimetry.RGBModel.Zw * mi.m12;
		var sb = Colorimetry.RGBModel.Xw * mi.m20 + Colorimetry.RGBModel.Yw * mi.m21 + Colorimetry.RGBModel.Zw * mi.m22;

		MtxRGB2XYZ.m00 = sr * m.m00;
		MtxRGB2XYZ.m01 = sg * m.m01;
		MtxRGB2XYZ.m02 = sb * m.m02;
		MtxRGB2XYZ.m10 = sr * m.m10;
		MtxRGB2XYZ.m11 = sg * m.m11;
		MtxRGB2XYZ.m12 = sb * m.m12;
		MtxRGB2XYZ.m20 = sr * m.m20;
		MtxRGB2XYZ.m21 = sg * m.m21;
		MtxRGB2XYZ.m22 = sb * m.m22;

		// MtxRGB2XYZ is required for function RGB2XYZ(RGB)
		MtxTranspose3x3(MtxRGB2XYZ);
		// MtxXYZ2RGB is required forfunction XYZ2RGB(XYZ)
		MtxInvert3x3(MtxRGB2XYZ, MtxXYZ2RGB);

	// Scaling
		Colorimetry.ScalingID = SelectedColorimetry.Scaling;

	return(Colorimetry);
}

function ChromaticAdaptationXYZ(XYZ)
{
	XYZ = CheckXYZ(XYZ);
	if (SelectedColorimetry.AdaptationMethod != 3) {
		if (Colorimetry.ReferenceWhite.X && Colorimetry.ReferenceWhite.Y && Colorimetry.ReferenceWhite.Z) {
			var As = SourceWhite.X * MtxAdaptMa.m00 + SourceWhite.Y * MtxAdaptMa.m10 + SourceWhite.Z * MtxAdaptMa.m20;
			var Bs = SourceWhite.X * MtxAdaptMa.m01 + SourceWhite.Y * MtxAdaptMa.m11 + SourceWhite.Z * MtxAdaptMa.m21;
			var Cs = SourceWhite.X * MtxAdaptMa.m02 + SourceWhite.Y * MtxAdaptMa.m12 + SourceWhite.Z * MtxAdaptMa.m22;

			var Ad = Colorimetry.ReferenceWhite.X * MtxAdaptMa.m00 + Colorimetry.ReferenceWhite.Y * MtxAdaptMa.m10 + Colorimetry.ReferenceWhite.Z * MtxAdaptMa.m20;
			var Bd = Colorimetry.ReferenceWhite.X * MtxAdaptMa.m01 + Colorimetry.ReferenceWhite.Y * MtxAdaptMa.m11 + Colorimetry.ReferenceWhite.Z * MtxAdaptMa.m21;
			var Cd = Colorimetry.ReferenceWhite.X * MtxAdaptMa.m02 + Colorimetry.ReferenceWhite.Y * MtxAdaptMa.m12 + Colorimetry.ReferenceWhite.Z * MtxAdaptMa.m22;

			var X1 = XYZ.X * MtxAdaptMa.m00 + XYZ.Y * MtxAdaptMa.m10 + XYZ.Z * MtxAdaptMa.m20;
			var Y1 = XYZ.X * MtxAdaptMa.m01 + XYZ.Y * MtxAdaptMa.m11 + XYZ.Z * MtxAdaptMa.m21;
			var Z1 = XYZ.X * MtxAdaptMa.m02 + XYZ.Y * MtxAdaptMa.m12 + XYZ.Z * MtxAdaptMa.m22;

			X1 *= (Ad / As);
			Y1 *= (Bd / Bs);
			Z1 *= (Cd / Cs);

			XYZ.X = X1 * MtxAdaptMaI.m00 + Y1 * MtxAdaptMaI.m10 + Z1 * MtxAdaptMaI.m20;
			XYZ.Y = X1 * MtxAdaptMaI.m01 + Y1 * MtxAdaptMaI.m11 + Z1 * MtxAdaptMaI.m21;
			XYZ.Z = X1 * MtxAdaptMaI.m02 + Y1 * MtxAdaptMaI.m12 + Z1 * MtxAdaptMaI.m22;
			return(CheckXYZ(XYZ));
		} else {
			XYZ.Reference = "No SPD data";
			XYZ.Adaptation = "Failed";
		}
	}
	return(XYZ);
}

function CheckXYZ(XYZ)
{
	XYZ.X = (XYZ.X < 0.0) ? 0.0 : XYZ.X;
	XYZ.Y = (XYZ.Y < 0.0) ? 0.0 : XYZ.Y;
	XYZ.Z = (XYZ.Z < 0.0) ? 0.0 : XYZ.Z;
	return(XYZ);
}

function XYZ2RGB(XYZ)
{
	let RGB = {};
	XYZ = CheckXYZ(XYZ);
	if (Colorimetry.ReferenceWhite.X >= 0 && Colorimetry.ReferenceWhite.Y >= 0 && Colorimetry.ReferenceWhite.Z >= 0) {
		var X2 = XYZ.X;
		var Y2 = XYZ.Y;
		var Z2 = XYZ.Z;

		if (SelectedColorimetry.AdaptationMethod != 3)
		{
			var As = Colorimetry.ReferenceWhite.X * MtxAdaptMa.m00 + Colorimetry.ReferenceWhite.Y * MtxAdaptMa.m10 + Colorimetry.ReferenceWhite.Z * MtxAdaptMa.m20;
			var Bs = Colorimetry.ReferenceWhite.X * MtxAdaptMa.m01 + Colorimetry.ReferenceWhite.Y * MtxAdaptMa.m11 + Colorimetry.ReferenceWhite.Z * MtxAdaptMa.m21;
			var Cs = Colorimetry.ReferenceWhite.X * MtxAdaptMa.m02 + Colorimetry.ReferenceWhite.Y * MtxAdaptMa.m12 + Colorimetry.ReferenceWhite.Z * MtxAdaptMa.m22;

			var Ad = Colorimetry.RGBModel.Xw * MtxAdaptMa.m00 + Colorimetry.RGBModel.Yw * MtxAdaptMa.m10 + Colorimetry.RGBModel.Zw * MtxAdaptMa.m20;
			var Bd = Colorimetry.RGBModel.Xw * MtxAdaptMa.m01 + Colorimetry.RGBModel.Yw * MtxAdaptMa.m11 + Colorimetry.RGBModel.Zw * MtxAdaptMa.m21;
			var Cd = Colorimetry.RGBModel.Xw * MtxAdaptMa.m02 + Colorimetry.RGBModel.Yw * MtxAdaptMa.m12 + Colorimetry.RGBModel.Zw * MtxAdaptMa.m22;

			var X1 = XYZ.X * MtxAdaptMa.m00 + XYZ.Y * MtxAdaptMa.m10 + XYZ.Z * MtxAdaptMa.m20;
			var Y1 = XYZ.X * MtxAdaptMa.m01 + XYZ.Y * MtxAdaptMa.m11 + XYZ.Z * MtxAdaptMa.m21;
			var Z1 = XYZ.X * MtxAdaptMa.m02 + XYZ.Y * MtxAdaptMa.m12 + XYZ.Z * MtxAdaptMa.m22;

			X1 *= (Ad / As);
			Y1 *= (Bd / Bs);
			Z1 *= (Cd / Cs);

			X2 = X1 * MtxAdaptMaI.m00 + Y1 * MtxAdaptMaI.m10 + Z1 * MtxAdaptMaI.m20;
			Y2 = X1 * MtxAdaptMaI.m01 + Y1 * MtxAdaptMaI.m11 + Z1 * MtxAdaptMaI.m21;
			Z2 = X1 * MtxAdaptMaI.m02 + Y1 * MtxAdaptMaI.m12 + Z1 * MtxAdaptMaI.m22;
		}

		RGB.R = Compand(X2 * MtxXYZ2RGB.m00 + Y2 * MtxXYZ2RGB.m10 + Z2 * MtxXYZ2RGB.m20);
		RGB.G = Compand(X2 * MtxXYZ2RGB.m01 + Y2 * MtxXYZ2RGB.m11 + Z2 * MtxXYZ2RGB.m21);
		RGB.B = Compand(X2 * MtxXYZ2RGB.m02 + Y2 * MtxXYZ2RGB.m12 + Z2 * MtxXYZ2RGB.m22);

		RGB.HEX = RGB2Hex(RGB);
		RGB.Model = Colorimetry.RGBModel.Name;
//		RGB.Gamut = "Inside";
//		if (RGB.R < 0.0 || RGB.R > 1.0 || RGB.G < 0.0 || RGB.G > 1.0 || RGB.B < 0.0 || RGB.B > 1.0) {
//			RGB.Gamut = "Outside";
//		}
		RGB.Reference = Colorimetry.RGBModel.Reference;
		RGB.Observer = Colorimetry.Observer;
		RGB.Adaptation = Colorimetry.AdaptationMethod;
		RGB.Gamma = Colorimetry.RGBModel.Gamma;
	}
	return(RGB);
}

function RGB2Hex(RGB)
{
	var R = (RGB.R < 0.0) ? 0.0 : (RGB.R > 1.0) ? 1 : RGB.R;
	var G = (RGB.G < 0.0) ? 0.0 : (RGB.G > 1.0) ? 1 : RGB.G;
	var B = (RGB.B < 0.0) ? 0.0 : (RGB.B > 1.0) ? 1 : RGB.B;

	R = (Math.round(R * 255)).toString(16);
	G = (Math.round(G * 255)).toString(16);
	B = (Math.round(B * 255)).toString(16);

	if (R.length == 1)
		R = "0" + R;
	if (G.length == 1)
		G = "0" + G;
	if (B.length == 1)
		B = "0" + B;
	return("#" + R + G + B);
}

function RGB2XYZ(RGB)
{
	let XYZ = {};

	var R = InvCompand(RGB.R);
	var G = InvCompand(RGB.G);
	var B = InvCompand(RGB.B);

	XYZ.X = R * MtxRGB2XYZ.m00 + G * MtxRGB2XYZ.m10 + B * MtxRGB2XYZ.m20;
	XYZ.Y = R * MtxRGB2XYZ.m01 + G * MtxRGB2XYZ.m11 + B * MtxRGB2XYZ.m21;
	XYZ.Z = R * MtxRGB2XYZ.m02 + G * MtxRGB2XYZ.m12 + B * MtxRGB2XYZ.m22;

	if (SelectedColorimetry.AdaptationMethod != 3)
	{
		var Ad = Colorimetry.ReferenceWhite.X * MtxAdaptMa.m00 + Colorimetry.ReferenceWhite.Y * MtxAdaptMa.m10 + Colorimetry.ReferenceWhite.Z * MtxAdaptMa.m20;
		var Bd = Colorimetry.ReferenceWhite.X * MtxAdaptMa.m01 + Colorimetry.ReferenceWhite.Y * MtxAdaptMa.m11 + Colorimetry.ReferenceWhite.Z * MtxAdaptMa.m21;
		var Cd = Colorimetry.ReferenceWhite.X * MtxAdaptMa.m02 + Colorimetry.ReferenceWhite.Y * MtxAdaptMa.m12 + Colorimetry.ReferenceWhite.Z * MtxAdaptMa.m22;

		var As = Colorimetry.RGBModel.Xw * MtxAdaptMa.m00 + Colorimetry.RGBModel.Yw * MtxAdaptMa.m10 + Colorimetry.RGBModel.Zw * MtxAdaptMa.m20;
		var Bs = Colorimetry.RGBModel.Xw * MtxAdaptMa.m01 + Colorimetry.RGBModel.Yw * MtxAdaptMa.m11 + Colorimetry.RGBModel.Zw * MtxAdaptMa.m21;
		var Cs = Colorimetry.RGBModel.Xw * MtxAdaptMa.m02 + Colorimetry.RGBModel.Yw * MtxAdaptMa.m12 + Colorimetry.RGBModel.Zw * MtxAdaptMa.m22;
		
		var X = XYZ.X * MtxAdaptMa.m00 + XYZ.Y * MtxAdaptMa.m10 + XYZ.Z * MtxAdaptMa.m20;
		var Y = XYZ.X * MtxAdaptMa.m01 + XYZ.Y * MtxAdaptMa.m11 + XYZ.Z * MtxAdaptMa.m21;
		var Z = XYZ.X * MtxAdaptMa.m02 + XYZ.Y * MtxAdaptMa.m12 + XYZ.Z * MtxAdaptMa.m22;

		X *= (Ad / As);
		Y *= (Bd / Bs);
		Z *= (Cd / Cs);

		XYZ.X = X * MtxAdaptMaI.m00 + Y * MtxAdaptMaI.m10 + Z * MtxAdaptMaI.m20;
		XYZ.Y = X * MtxAdaptMaI.m01 + Y * MtxAdaptMaI.m11 + Z * MtxAdaptMaI.m21;
		XYZ.Z = X * MtxAdaptMaI.m02 + Y * MtxAdaptMaI.m12 + Z * MtxAdaptMaI.m22;
	}
	return(CheckXYZ(XYZ));
}

function Compand(linear)
{
	var companded;
	if (Colorimetry.RGBModel.Gamma > 0.0)
	{
		companded = (linear >= 0.0) ? Math.pow(linear, 1.0 / Colorimetry.RGBModel.Gamma) : -Math.pow(-linear, 1.0 / Colorimetry.RGBModel.Gamma);
	}
	else if (Colorimetry.RGBModel.Gamma < 0.0)
	{
		/* sRGB */
		var sign = 1.0;
		if (linear < 0.0)
		{
			sign = -1.0;
			linear = -linear;
		}
		companded = (linear <= 0.0031308) ? (linear * 12.92) : (1.055 * Math.pow(linear, 1.0 / 2.4) - 0.055);
		companded *= sign;
	}
	else
	{
		/* L* */
		var sign = 1.0;
		if (linear < 0.0)
		{
			sign = -1.0;
			linear = -linear;
		}
		companded = (linear <= (216.0 / 24389.0)) ? (linear * 24389.0 / 2700.0) : (1.16 * Math.pow(linear, 1.0 / 3.0) - 0.16);
		companded *= sign;
	}
	return(companded);
}

function InvCompand(companded)
{
	var linear;
	if (Colorimetry.RGBModel.Gamma > 0.0)
	{
		linear = (companded >= 0.0) ? Math.pow(companded, Colorimetry.RGBModel.Gamma) : -Math.pow(-companded, Colorimetry.RGBModel.Gamma);
	}
	else if (Colorimetry.RGBModel.Gamma < 0.0)
	{
		/* sRGB */
		var sign = 1.0;
		if (companded < 0.0)
		{
			sign = -1.0;
			companded = -companded;
		}
		linear = (companded <= 0.04045) ? (companded / 12.92) : Math.pow((companded + 0.055) / 1.055, 2.4);
		linear *= sign;
	}
	else
	{
		/* L* */
		var sign = 1.0;
		if (companded < 0.0)
		{
			sign = -1.0;
			companded = -companded;
		}
		linear = (companded <= 0.08) ? (2700.0 * companded / 24389.0) : ((((1000000.0 * companded + 480000.0) * companded + 76800.0) * companded + 4096.0) / 1560896.0);
		linear *= sign;
	}
	return(linear);
}

function XYZ2xyY(XYZ)
{
	let xyY = {};
	XYZ = CheckXYZ(XYZ);
	var XYZSum = XYZ.X + XYZ.Y + XYZ.Z;
	if (XYZSum > 0.0) {
		xyY.x = XYZ.X / XYZSum;
		xyY.y = XYZ.Y / XYZSum;
	} else {
		var ReferenceWhiteSum = Colorimetry.ReferenceWhite.X + Colorimetry.ReferenceWhite.Y + Colorimetry.ReferenceWhite.Z;
		xyY.x = Colorimetry.ReferenceWhite.X / Colorimetry.ReferenceWhiteSum;
		xyY.y = Colorimetry.ReferenceWhite.Y / ReferenceWhiteSum;
	}
	xyY.Y = XYZ.Y;
	xyY.Reference = XYZ.Reference;
	xyY.Observer = XYZ.Observer;
	return(xyY);
}

function XYZ2Lab(XYZ)
{
	let Lab = {};
	XYZ = CheckXYZ(XYZ);
	if (Colorimetry.ReferenceWhite.X >= 0 && Colorimetry.ReferenceWhite.Y >= 0 && Colorimetry.ReferenceWhite.Z >= 0) {
		var xr = XYZ.X / Colorimetry.ReferenceWhite.X;
		var yr = XYZ.Y / Colorimetry.ReferenceWhite.Y;
		var zr = XYZ.Z / Colorimetry.ReferenceWhite.Z;

		var fx = (xr > kE) ? Math.pow(xr, 1.0 / 3.0) : ((kK * xr + 16.0) / 116.0);
		var fy = (yr > kE) ? Math.pow(yr, 1.0 / 3.0) : ((kK * yr + 16.0) / 116.0);
		var fz = (zr > kE) ? Math.pow(zr, 1.0 / 3.0) : ((kK * zr + 16.0) / 116.0);

		Lab.L = 116.0 * fy - 16.0;
		Lab.a = 500.0 * (fx - fy);
		Lab.b = 200.0 * (fy - fz);

		Lab.L = (Lab.L < 0.0) ? 0.0 : (Lab.L > 100.0) ? 100.0 : Lab.L;
		Lab.Reference = Colorimetry.ReferenceWhite.Name;
		Lab.Observer = Colorimetry.Observer;
	}
	return(Lab);
}

function Lab2XYZ(Lab)
{
	let XYZ = {};

	var fy = (Lab.L + 16.0) / 116.0;
	var fx = 0.002 * Lab.a + fy;
	var fz = fy - 0.005 * Lab.b;

	var fx3 = fx * fx * fx;
	var fz3 = fz * fz * fz;

	var xr = (fx3 > kE) ? fx3 : ((116.0 * fx - 16.0) / kK);
	var yr = (Lab.L > kKE) ? Math.pow(((Lab.L + 16.0) / 116.0), 3.0) : (Lab.L / kK);
	var zr = (fz3 > kE) ? fz3 : ((116.0 * fz - 16.0) / kK);

	XYZ.X = xr * Colorimetry.ReferenceWhite.X;
	XYZ.Y = yr * Colorimetry.ReferenceWhite.Y;
	XYZ.Z = zr * Colorimetry.ReferenceWhite.Z;

	// Note: Cases issues in canvas creation
	//return(CheckXYZ(XYZ));
	return(XYZ);
}

function Lab2Canvas(canvas, ctx, L)
{
	var x;
	var y;

	for (x = 0; x <= canvas.width; x++) {
		for (y = 0; y <= canvas.height; y++) {
			let Lab = {L: L, a: -150+300*x/canvas.width, b: 150-300*y/canvas.height};
			let RGB = XYZ2RGB(Lab2XYZ(Lab));
			ctx.fillStyle = RGB.HEX;
			ctx.fillRect(x, y, 1, 1);
		}
	}
	return(ctx);
}

function YellownessIndex2Canvas(canvas, ctx, L)
{
	var x;
	var y;
	var YI;
	var Index=new Array();

	for (x = 0; x <= canvas.width; x++) {
		for (y = 0; y <= canvas.height; y++) {
			let Lab = {L: L, a: -150+300*x/canvas.width, b: 150-300*y/canvas.height};
			let XYZ = Lab2XYZ(Lab);
			YI = ((100 * (1.2769 * XYZ.X - 1.0592 * XYZ.Z)) / XYZ.Y).toFixed(0);
			switch(parseInt(YI)) {
				case 0:
					ctx.fillStyle = '#000000';
						if (!Index[0]) {
							Index[0]=new Array();
							Index[0].Color = 0;
							Index[0].x = x + 5;
							Index[0].y = y + 20;
					}
					break;
				case 100:
					ctx.fillStyle = '#000000';
					if (!Index[1]) {
						Index[1]=new Array();
						Index[1].Color = 100;
						Index[1].x = x + 5;
						Index[1].y = y + 20;
					}
					break;
				case 200:
					ctx.fillStyle = '#000000';
					if (!Index[2]) {
						Index[2]=new Array();
						Index[2].Color = 200;
						Index[2].x = x + 5;
						Index[2].y = y + 20;
					}
					break;
				case 300:
					ctx.fillStyle = '#000000';
					if (!Index[3]) {
						Index[3]=new Array();
						Index[3].Color = 300;
						Index[3].x = x + 5;
						Index[3].y = y + 20;
					}
					break;
				case 400:
					ctx.fillStyle = '#000000';
					if (!Index[4]) {
						Index[4]=new Array();
						Index[4].Color = 400;
						Index[4].x = x + 5;
						Index[4].y = y + 20;
					}
					break;
				case 500:
					ctx.fillStyle = '#000000';
					if (!Index[5]) {
						Index[5]=new Array();
						Index[5].Color = 500;
						Index[5].x = x + 5;
						Index[5].y = y + 20;
					}
					break;
				case 600:
					ctx.fillStyle = '#000000';
					if (!Index[6]) {
						Index[6]=new Array();
						Index[6].Color = 600;
						Index[6].x = x + 5;
						Index[6].y = y + 20;
					}
					break;
				case 700:
					ctx.fillStyle = '#000000';
					if (!Index[7]) {
						Index[7]=new Array();
						Index[7].Color = 700;
						Index[7].x = x + 5;
						Index[7].y = y + 20;
					}
					break;
				case 800:
					ctx.fillStyle = '#000000';
					if (!Index[8]) {
						Index[8]=new Array();
						Index[8].Color = 800;
						Index[8].x = x + 5;
						Index[8].y = y + 20;
					}
					break;
				case 50:
				case 150:
				case 250:
				case 350:
				case 450:
				case 550:
				case 650:
				case 750:
				case 850:
					ctx.fillStyle = '#000000';
					break;
				default:
					let RGB = XYZ2RGB(XYZ);
					ctx.fillStyle = RGB.HEX;
			}
			ctx.fillRect(x, y, 1, 1);
		}
	}
	ctx.font = "14px Arial";
	ctx.fillStyle = "black";

	if (Index[0]) {	ctx.fillText(Index[0].Color, Index[0].x, Index[0].y); }
	if (Index[1]) {	ctx.fillText(Index[1].Color, Index[1].x, Index[1].y); }
	if (Index[2]) {	ctx.fillText(Index[2].Color, Index[2].x, Index[2].y); }
	if (Index[3]) {	ctx.fillText(Index[3].Color, Index[3].x, Index[3].y); }
	if (Index[4]) {	ctx.fillText(Index[4].Color, Index[4].x, Index[4].y); }
	if (Index[5]) {	ctx.fillText(Index[5].Color, Index[5].x, Index[5].y); }
	if (Index[6]) {	ctx.fillText(Index[6].Color, Index[6].x, Index[6].y); }
	if (Index[7]) {	ctx.fillText(Index[7].Color, Index[7].x, Index[7].y); }
	if (Index[8]) {	ctx.fillText(Index[8].Color, Index[8].x, Index[8].y); }
	return(ctx);
}

function ASTMColor2Canvas(canvas, ctx, L)
{
	var x;
	var y;
	var ASTM;
	var DX;
	var DY;
	var DZ;
	var Tx;
	var Ty;
	var DMin = 0.999;
	var DMax = 1.001;
	var Index=new Array();

	for (x = 0; x <= canvas.width; x++) {
		for (y = 0; y <= canvas.height; y++) {
			let Lab = {L: L, a: -150+300*x/canvas.width, b: 150-300*y/canvas.height};
			let XYZ = Lab2XYZ(Lab);

			var DX = -1 * Math.log10(XYZ.X / 0.98072);
			var DY = -1 * Math.log10(XYZ.Y / 1.00000);
			var DZ = -1 * Math.log10(XYZ.Z / 1.18225);

			var ASTM = (0.25 + 0.8695 * ( DX + DY + DZ )).toFixed(3);

			ctx.fillStyle = 'DimGrey';
			
			if (x >= 5) {
				Tx = -3;
			} else {
				Tx = 5 - x;
			}

			if (y < 5) {
				Ty = 5 - y;
			} else if (y > (canvas.height - 5)) {
				Ty = -5;
			} else {
				Ty = 0;
			}

			switch(true) {
				case (ASTM >= 0 - 0.001 && ASTM <= 0 + 0.001):
					if (!Index[0]) {
						Index[0]=new Array();
						Index[0].Color = 0;
						Index[0].x = x + Tx;
						Index[0].y = y + Ty;
					}
					break;
				case (ASTM >= 1 * DMin && ASTM <= 1 * DMax):
					if (!Index[1]) {
						Index[1]=new Array();
						Index[1].Color = 1;
						Index[1].x = x + Tx;
						Index[1].y = y + Ty;
					}
					break;
				case (ASTM >= 2 * Math.pow(DMin, 2) && ASTM <= 2 * Math.pow(DMax, 2)):
					if (!Index[2]) {
						Index[2]=new Array();
						Index[2].Color = 2;
						Index[2].x = x + Tx;
						Index[2].y = y + Ty;
					}
					break;
				case (ASTM >= 3 * Math.pow(DMin, 3) && ASTM <= 3 * Math.pow(DMax, 3)):
					if (!Index[3]) {
						Index[3]=new Array();
						Index[3].Color = 3;
						Index[3].x = x + Tx;
						Index[3].y = y + Ty;
					}
					break;
				case (ASTM >= 4 * Math.pow(DMin, 4) && ASTM <= 4 * Math.pow(DMax, 4)):
					if (!Index[4]) {
						Index[4]=new Array();
						Index[4].Color = 4;
						Index[4].x = x + Tx;
						Index[4].y = y + Ty;
					}
					break;
				case (ASTM >= 5 * Math.pow(DMin, 5) && ASTM <= 5 * Math.pow(DMax, 5)):
					if (!Index[5]) {
						Index[5]=new Array();
						Index[5].Color = 5;
						Index[5].x = x + Tx;
						Index[5].y = y + Ty;
					}
					break;
				case (ASTM >= 6 * Math.pow(DMin, 6) && ASTM <= 6 * Math.pow(DMax, 6)):
					if (!Index[6]) {
						Index[6]=new Array();
						Index[6].Color = 6;
						Index[6].x = x + Tx;
						Index[6].y = y + Ty;
					}
					break;
				case (ASTM >= 7 * Math.pow(DMin, 7) && ASTM <= 7 * Math.pow(DMax, 7)):
					if (!Index[7]) {
						Index[7]=new Array();
						Index[7].Color = 7;
						Index[7].x = x + Tx;
						Index[7].y = y + Ty;
					}
					break;
				case (ASTM >= 8 * Math.pow(DMin, 8) && ASTM <= 8 * Math.pow(DMax, 8)):
					if (!Index[8]) {
						Index[8]=new Array();
						Index[8].Color = 8;
						Index[8].x = x + Tx;
						Index[8].y = y + Ty;
					}
					break;
				case (ASTM >= 0.5 * DMin && ASTM <= 0.5 * DMax):
				case (ASTM >= 1.5 * Math.pow(DMin, 1.5) && ASTM <= 1.5 * Math.pow(DMax, 1.5)):
					ctx.fillStyle = 'Gainsboro';
					break;
				default:
					let RGB = XYZ2RGB(Lab2XYZ(Lab));
					ctx.fillStyle = RGB.HEX;
			}

			ctx.fillRect(x, y, 1, 1);
		}
	}
	ctx.font = "14px Arial";
	ctx.fillStyle = "black";

	if (Index[0]) {	ctx.fillText(Index[0].Color, Index[0].x, Index[0].y); }
	if (Index[1]) {	ctx.fillText(Index[1].Color, Index[1].x, Index[1].y); }
	if (Index[2]) {	ctx.fillText(Index[2].Color, Index[2].x, Index[2].y); }
	if (Index[3]) {	ctx.fillText(Index[3].Color, Index[3].x, Index[3].y); }
	if (Index[4]) {	ctx.fillText(Index[4].Color, Index[4].x, Index[4].y); }
	if (Index[5]) {	ctx.fillText(Index[5].Color, Index[5].x, Index[5].y); }
	if (Index[6]) {	ctx.fillText(Index[6].Color, Index[6].x, Index[6].y); }
	if (Index[7]) {	ctx.fillText(Index[7].Color, Index[7].x, Index[7].y); }
	if (Index[8]) {	ctx.fillText(Index[8].Color, Index[8].x, Index[8].y); }
	return(ctx);
}

function SayboltColor2Canvas(canvas, ctx, L)
{
	var x;
	var y;
	var Tx = -5;
	var Ty = -5;
	var DMin = 0.985;
	var DMax = 1.015;

	var Lab = {};
	var Saybolt;
	var DeltaE;

	var Index=new Array();

	for (x = 0; x <= canvas.width; x++) {
		for (y = 0; y <= canvas.height; y++) {
			Lab = {L: L, a: -150+300*x/canvas.width, b: 150-300*y/canvas.height};

			DeltaE = Math.sqrt(Math.pow((100 - Lab.L), 2) + Math.pow(Lab.a, 2) + Math.pow(Lab.b, 2));
			Saybolt = (51.1 + 44.5 / (Math.log10(DeltaE) - 2.55)).toFixed(2);

			ctx.fillStyle = 'DimGrey';

			if (Saybolt >= 30 * DMin && Saybolt <= 30 * DMax) {
				if (!Index[0]) {
					Index[0]=new Array();
					Index[0].Color = 30;
					Index[0].x = x + Tx;
					Index[0].y = y + Ty;
				}
			} else if (Saybolt >= 25 * DMin && Saybolt <= 25 * DMax) {
			ctx.fillStyle = 'Gainsboro';
			} else if (Saybolt >= 20 * DMin && Saybolt <= 20 * DMax) {
				if (!Index[1]) {
					Index[1]=new Array();
					Index[1].Color = 20;
					Index[1].x = x + Tx;
					Index[1].y = y + Ty;
				}
			} else if (Saybolt >= 15 * DMin && Saybolt <= 15 * DMax) {
			ctx.fillStyle = 'Gainsboro';
			} else if (Saybolt >= 10 * DMin && Saybolt <= 10 * DMax) {
				if (!Index[2]) {
					Index[2]=new Array();
					Index[2].Color = 10;
					Index[2].x = x + Tx;
					Index[2].y = y + Ty;
				}
			} else if (Saybolt >= 5 * DMin && Saybolt <= 5 * DMax) {
			ctx.fillStyle = 'Gainsboro';
			} else if (Saybolt >= 0 * DMin && Saybolt <= 0 * DMax) {
				if (!Index[3]) {
					Index[3]=new Array();
					Index[3].Color = 0;
					Index[3].x = x + Tx;
					Index[3].y = y + Ty;
				}
			} else if (Saybolt >= -5 * DMax && Saybolt <= -5 * DMin) {
			ctx.fillStyle = 'Gainsboro';
			} else if (Saybolt >= -10 * DMax && Saybolt <= -10 * DMin) {
				if (!Index[4]) {
					Index[4]=new Array();
					Index[4].Color = -10;
					Index[4].x = x + Tx;
					Index[4].y = y + Ty;
				}
			} else if (Saybolt >= -16 * DMax && Saybolt <= -16 * DMin) {
			ctx.fillStyle = 'Gainsboro';
				if (!Index[5]) {
					Index[5]=new Array();
					Index[5].Color = -16;
					Index[5].x = x + Tx;
					Index[5].y = y + Ty;
				}
			} else {
				let RGB = XYZ2RGB(Lab2XYZ(Lab));
				ctx.fillStyle = RGB.HEX;
			}
			ctx.fillRect(x, y, 1, 1);
		}
	}
	ctx.font = "14px Arial";
	ctx.fillStyle = "black";

	if (Index[0]) {	ctx.fillText(Index[0].Color, Index[0].x, Index[0].y); }
	if (Index[1]) {	ctx.fillText(Index[1].Color, Index[1].x, Index[1].y); }
	if (Index[2]) {	ctx.fillText(Index[2].Color, Index[2].x, Index[2].y); }
	if (Index[3]) {	ctx.fillText(Index[3].Color, Index[3].x, Index[3].y); }
	if (Index[4]) {	ctx.fillText(Index[4].Color, Index[4].x, Index[4].y); }
	if (Index[5]) {	ctx.fillText(Index[5].Color, Index[5].x, Index[5].y); }

	return(ctx);
}

function XYZ2Luv(XYZ)
{
	let Luv = {};
	XYZ = CheckXYZ(XYZ);
	if (Colorimetry.ReferenceWhite.X >= 0 && Colorimetry.ReferenceWhite.Y >= 0 && Colorimetry.ReferenceWhite.Z >= 0) {
		var Den = XYZ.X + 15.0 * XYZ.Y + 3.0 * XYZ.Z;
		var up = (Den > 0.0) ? ((4.0 * XYZ.X) / (XYZ.X + 15.0 * XYZ.Y + 3.0 * XYZ.Z)) : 0.0;
		var vp = (Den > 0.0) ? ((9.0 * XYZ.Y) / (XYZ.X + 15.0 * XYZ.Y + 3.0 * XYZ.Z)) : 0.0;

		var urp = (4.0 * Colorimetry.ReferenceWhite.X) / (Colorimetry.ReferenceWhite.X + 15.0 * Colorimetry.ReferenceWhite.Y + 3.0 * Colorimetry.ReferenceWhite.Z);
		var vrp = (9.0 * Colorimetry.ReferenceWhite.Y) / (Colorimetry.ReferenceWhite.X + 15.0 * Colorimetry.ReferenceWhite.Y + 3.0 * Colorimetry.ReferenceWhite.Z);
		
		var yr = XYZ.Y / Colorimetry.ReferenceWhite.Y;

		Luv.L = (yr > kE) ? (116.0 * Math.pow(yr, 1.0 / 3.0) - 16.0) : (kK * yr);
		Luv.u = 13.0 * Luv.L * (up - urp);
		Luv.v = 13.0 * Luv.L * (vp - vrp);

		Luv.L = (Luv.L < 0.0) ? 0.0 : (Luv.L > 100.0) ? 100.0 : Luv.L;

		Luv.L = Luv.L;
		Luv.u = Luv.u;
		Luv.v = Luv.v;
		Luv.Reference = Colorimetry.ReferenceWhite.Name;
		Luv.Observer = Colorimetry.Observer;
	}
	return(Luv);
}

function Lab2LCHab(Lab)
{
	let LCHab = {};

	LCHab.L = Lab.L;
	LCHab.C = Math.sqrt(Lab.a * Lab.a + Lab.b * Lab.b);
	LCHab.H = 180.0 * Math.atan2(Lab.b, Lab.a) / Math.PI;

	LCHab.L = (LCHab.L < 0.0) ? 0 : (LCHab.L > 100.0) ? 100 : LCHab.L;
	LCHab.C = (LCHab.C < 0.0) ? 0 : LCHab.C;
	while (LCHab.H < 0.0)
	{
		LCHab.H += 360.0;
	}
	while (LCHab.H > 0.0)
	{
		LCHab.H -= 360.0;
	}

	LCHab.L = LCHab.L;
	LCHab.C = LCHab.C;
	LCHab.H = LCHab.H;
	return(LCHab);
}

function LCHab2Lab(LCHab)
{
	let Lab = {};

	Lab.L = LCHab.L;
	Lab.a = LCHab.C * Math.cos(LCHab.H * Math.PI / 180.0);
	Lab.b = LCHab.C * Math.sin(LCHab.H * Math.PI / 180.0);

	Lab.L = (Lab.L < 0.0) ? 0.0 : (Lab.L > 100.0) ? 100.0 : Lab.L;
	return(Lab);
}

function Luv2LCHuv(Luv)
{
	let LCHuv = {};

	LCHuv.L = Luv.L;
	LCHuv.C = Math.sqrt(Luv.u * Luv.u + Luv.v * Luv.v);
	LCHuv.H = 180.0 * Math.atan2(Luv.v, Luv.u) / Math.PI;

	LCHuv.L = (LCHuv.L < 0.0) ? 0.0 : (LCHuv.L > 100.0) ? 100.0 : LCHuv.L;
	LCHuv.C = (LCHuv.C < 0.0) ? 0.0 : LCHuv.C;
	while (LCHuv.H < 0.0)
	{
		LCHuv.H += 360.0;
	}
	while (LCHuv.H >= 360.0)
	{
		LCHuv.H -= 360.0;
	}

	LCHuv.L = LCHuv.L, 4;
	LCHuv.C = LCHuv.C, 4;
	LCHuv.H = LCHuv.H, 4;
	return(LCHuv);
}

function LCHuv2Luv(LCHuv)
{
	let Luv = {};

	Luv.L = LCHuv.L;
	Luv.u = LCHuv.C * Math.cos(LCHuv.H * Math.PI / 180.0);
	Luv.v = LCHuv.C * Math.sin(LCHuv.H * Math.PI / 180.0);

	Luv.L = (Luv.L < 0.0) ? 0 : (Luv.L > 100.0) ? 100 : Luv.L;
	return(Luv);
}

function XYZ2HunterLab(XYZ)
{
	let HunterLab = {};
	XYZ = CheckXYZ(XYZ);
	if (Colorimetry.ReferenceWhite.X >= 0 && Colorimetry.ReferenceWhite.Y >= 0 && Colorimetry.ReferenceWhite.Z >= 0) {
		var Ka = (175.0 / 198.04) * (Colorimetry.ReferenceWhite.Y * 100 + Colorimetry.ReferenceWhite.X * 100);
		var Kb = (70.0 / 218.11) * (Colorimetry.ReferenceWhite.Y * 100 + Colorimetry.ReferenceWhite.Z * 100);

		HunterLab.L = 100.0 * Math.sqrt(XYZ.Y / Colorimetry.ReferenceWhite.Y );
		HunterLab.a = Ka * (((XYZ.X / Colorimetry.ReferenceWhite.X) - (XYZ.Y / Colorimetry.ReferenceWhite.Y) ) / Math.sqrt(XYZ.Y / Colorimetry.ReferenceWhite.Y));
		HunterLab.b = Kb * (((XYZ.Y / Colorimetry.ReferenceWhite.Y) - (XYZ.Z / Colorimetry.ReferenceWhite.Z) ) / Math.sqrt(XYZ.Y / Colorimetry.ReferenceWhite.Y));

		HunterLab.L = HunterLab.L;
		HunterLab.a = HunterLab.a;
		HunterLab.b = HunterLab.b;
		HunterLab.Reference = Colorimetry.ReferenceWhite.Name;
		HunterLab.Observer = Colorimetry.Observer;
	}
	return(HunterLab);
}

function XYZ2CCT_McCamy(XYZ)
{
	var CCT = '';
	XYZ = CheckXYZ(XYZ);
	let xyY = XYZ2xyY(XYZ);
	var n = (xyY.x - 0.3320) / (0.1858 - xyY.y);
	CCT = (449.0 * Math.pow(n, 3)) + (3525.0 * Math.pow(n, 2)) + (6823.3 * n) + 5520.33;

	CCT = ((CCT >= (10000.0 / 6.0)) && (CCT <= 25000.0)) ? CCT : "Out of range";
	return(CCT);
}

function XYZ2CCT_Robertson(XYZ)
{
	var CCT = '';
	XYZ = CheckXYZ(XYZ);
	var rt = [	/* reciprocal temperature (K) */
			  0.0e-6,  10.0e-6,  20.0e-6,  30.0e-6,  40.0e-6,  50.0e-6,
			  60.0e-6,  70.0e-6,  80.0e-6,  90.0e-6, 100.0e-6, 125.0e-6,
			  150.0e-6, 175.0e-6, 200.0e-6, 225.0e-6, 250.0e-6, 275.0e-6,
			  300.0e-6, 325.0e-6, 350.0e-6, 375.0e-6, 400.0e-6, 425.0e-6,
			  450.0e-6, 475.0e-6, 500.0e-6, 525.0e-6, 550.0e-6, 575.0e-6,
			  600.0e-6
			  ];
	var u = [
			 0.18006, 0.18066, 0.18133, 0.18208, 0.18293, 0.18388, 
			 0.18494, 0.18611, 0.18740, 0.18880, 0.19032, 0.19462, 
			 0.19962, 0.20525, 0.21142, 0.21807, 0.22511, 0.23247, 
			 0.24010, 0.24792, 0.25591, 0.26400, 0.27218, 0.28039, /* 0.24792 is correct, W&S shows as 0.24702 which is a typo */
			 0.28863, 0.29685, 0.30505, 0.31320, 0.32129, 0.32931, 
			 0.33724
			 ];
	var v = [
			 0.26352, 0.26589, 0.26846, 0.27119, 0.27407, 0.27709, 
			 0.28021, 0.28342, 0.28668, 0.28997, 0.29326, 0.30141, 
			 0.30921, 0.31647, 0.32312, 0.32909, 0.33439, 0.33904, 
			 0.34308, 0.34655, 0.34951, 0.35200, 0.35407, 0.35577, 
			 0.35714, 0.35823, 0.35907, 0.35968, 0.36011, 0.36038, 
			 0.36051
			 ];
	var t = [
			 -0.24341, -0.25479, -0.26876, -0.28539, -0.30470, -0.32675,
			 -0.35156, -0.37915, -0.40955, -0.44278, -0.47888, -0.58204,
			 -0.70471, -0.84901, -1.0182,  -1.2168,  -1.4512,  -1.7298,
			 -2.0637,  -2.4681,  -2.9641,  -3.5814,  -4.3633,  -5.3762,
			 -6.7262,  -8.5955,  -11.324,  -15.628,  -23.325,  -40.770,
			 -116.45
			 ];
	var us = (4.0 * XYZ.X) / (XYZ.X + 15.0 * XYZ.Y + 3.0 * XYZ.Z);
	var vs = (6.0 * XYZ.Y) / (XYZ.X + 15.0 * XYZ.Y + 3.0 * XYZ.Z);
	var prevVertDist = 0.0;
	var thisVertDist = 0.0;
	var i = 0;

	for (i = 0; i < 31; i++)
	{
		thisVertDist = (vs - v[i]) - t[i] * (us - u[i]);
		if ((i == 0) && (thisVertDist <= 0.0))
		{
			CCT = "Color is too blue";	/* cannot convert: color is too blue */
			return(CCT);
		}
		if ((i > 0) && (thisVertDist <= 0.0))
			break;	/* found lines bounding (us, vs) : i-1 and i */
		prevVertDist = thisVertDist;
	}
	if (i == 31)
	{
		CCT = "Color is too red";	/* cannot convert: color is too red */
	}
	else
	{
		var thisPerpDist = thisVertDist / Math.sqrt(1.0 + t[i] * t[i]);
		var prevPerpDist = prevVertDist / Math.sqrt(1.0 + t[i-1] * t[i-1]);
		var w = prevPerpDist / (prevPerpDist - thisPerpDist);		/* w = lerping parameter, 0 : i-1, 1 : i */
		CCT = 1.0 / ((rt[i] - rt[i-1]) * w + rt[i-1]);			/* 1.0 / (LERP(rt[i-1], rt[i], w)) */
	}
	CCT = ((CCT >= (10000.0 / 6.0)) && (CCT <= 25000.0)) ? CCT : "Out of range";
	return(CCT);
}

function XYZ2DominantWavelength(XYZ)
{
	var DominantWavelength = '';
	XYZ = CheckXYZ(XYZ);
	let xyY = XYZ2xyY(XYZ);

	var xr = Colorimetry.ReferenceWhite.X / (Colorimetry.ReferenceWhite.X + Colorimetry.ReferenceWhite.Y + Colorimetry.ReferenceWhite.Z);
	var yr = Colorimetry.ReferenceWhite.Y / (Colorimetry.ReferenceWhite.X + Colorimetry.ReferenceWhite.Y + Colorimetry.ReferenceWhite.Z);

	var count = 0;
	var tArray = [0.0, 0.0];	// t
	var wArray = [0.0, 0.0];	// wavelength
	var cArray = [0, 0];		// cycle

	var StdObs = window[Colorimetry.Observer];
	var nm;

	var a = xyY.x - xr;
	var b = xyY.y - yr;

	if ((a >= -0.000001) && (a <= 0.000001) && (b >= -0.000001) && (b <= 0.000001))
	{
		return("Note: Measured color is nearly the same as the reference");	// (xyY.x, xyY.y) is the same as (xr, yr)
	}

	for (nm = 360; nm <= 830; nm += 5)
	{
		var i1 = (nm - 360) / 5;
		var i2 = (nm == 830) ? 0 : i1 + 1;
		var nm2 = 5 * i2 + 360;

		var x1 = StdObs[nm][0] / (StdObs[nm][0] + StdObs[nm][1] + StdObs[nm][2]);
		var y1 = StdObs[nm][1] / (StdObs[nm][0] + StdObs[nm][1] + StdObs[nm][2]);
		var x2 = StdObs[nm2][0] / (StdObs[nm2][0] + StdObs[nm2][1] + StdObs[nm2][2]);
		var y2 = StdObs[nm2][1] / (StdObs[nm2][0] + StdObs[nm2][1] + StdObs[nm2][2]);

		var c = x1 - xr;
		var d = y1 - yr;
		var e = x2 - x1;
		var f = y2 - y1;

		var s = (a * d - b * c) / (b * e - a * f);
		if ((s < 0.0) || (s >= 1.0))
		{
			continue;
		}

		var t = (Math.abs(a) >= Math.abs(b)) ? ((e * s + c) / a) : ((f * s + d) / b);
		tArray[count] = t;
		cArray[count] = nm;
		wArray[count] = (nm2 - nm) * s + nm;
		count += 1;
	}

	if ((cArray[1] == 830) && (tArray[1] > 0.0))
	{
		DominantWavelength = -wArray[0];
	}
	else
	{
		DominantWavelength = (tArray[0] >= 0.0) ? wArray[0] : wArray[1];
	}

	DominantWavelength = (DominantWavelength > 0.0) ? DominantWavelength : "Note: Out of range";
	return(DominantWavelength);
}

// Reference: Lab1
// Sample: Lab2
function DeltaE1976(Lab1, Lab2)
{
	var DE1976;
	if (Lab1.L && Lab1.a && Lab1.b && Lab2.L && Lab2.a && Lab2.b) {
		var delL = Lab1.L - Lab2.L;
		var dela = Lab1.a - Lab2.a;
		var delb = Lab1.b - Lab2.b;
		DE1976 = Math.sqrt(delL * delL + dela * dela + delb * delb);
	}
	return(DE1976);
}

// Reference: Lab1
// Sample: Lab2
function DeltaE1994(Lab1, Lab2)
{
	var DE1994;
	if (Lab1.L && Lab1.a && Lab1.b && Lab2.L && Lab2.a && Lab2.b) {
		var textiles = false;
		var k1 = (textiles == true) ? 0.048 : 0.045;
		var k2 = (textiles == true) ? 0.014 : 0.015;
		var kL = (textiles == true) ? 2.000 : 1.000;
		var kC = 1.0;
		var kH = 1.0;

		var C1 = Math.sqrt(Lab1.a * Lab1.a + Lab1.b * Lab1.b);
		var C2 = Math.sqrt(Lab2.a * Lab2.a + Lab2.b * Lab2.b);

		var delA = Lab1.a - Lab2.a;
		var delB = Lab1.b - Lab2.b;
		var delC = C1 - C2;
		var delH2 = delA * delA + delB * delB - delC * delC;
		var delH = (delH2 > 0.0) ? Math.sqrt(delH2) : 0.0;
		var delL = Lab1.L - Lab2.L;

		var sL = 1.0;
		var sC = 1.0 + k1 * C1;
		var sH = 1.0 + k2 * C1;

		var vL = delL / (kL * sL);
		var vC = delC / (kC * sC);
		var vH = delH / (kH * sH);

//		if (textiles == true)
//		{
//			DE1994_Textiles = Math.sqrt(vL * vL + vC * vC + vH * vH);
//		}
//		else
//		{
//			DE1994_GraphicArts = Math.sqrt(vL * vL + vC * vC + vH * vH);
//		}

		DE1994 = Math.sqrt(vL * vL + vC * vC + vH * vH);
	}
	return(DE1994);
}

// Reference: Lab1
// Sample: Lab2
function DeltaE2000(Lab1, Lab2)
{
	var DE2000;
	if (Lab1.L && Lab1.a && Lab1.b && Lab2.L && Lab2.a && Lab2.b) {
		var kL = 1.0;
		var kC = 1.0;
		var kH = 1.0;
		var lBarPrime = 0.5 * (Lab1.L * 1 + Lab2.L * 1);
		var c1 = Math.sqrt(Lab1.a * Lab1.a + Lab1.b * Lab1.b);
		var c2 = Math.sqrt(Lab2.a * Lab2.a + Lab2.b * Lab2.b);
		var cBar = 0.5 * (c1 + c2);
		var cBar7 = cBar * cBar * cBar * cBar * cBar * cBar * cBar;
		var g = 0.5 * (1.0 - Math.sqrt(cBar7 / (cBar7 + 6103515625.0)));	/* 6103515625 = 25^7 */
		var a1Prime = Lab1.a * (1.0 + g);
		var a2Prime = Lab2.a * (1.0 + g);
		var c1Prime = Math.sqrt(a1Prime * a1Prime + Lab1.b * Lab1.b);
		var c2Prime = Math.sqrt(a2Prime * a2Prime + Lab2.b * Lab2.b);
		var cBarPrime = 0.5 * (c1Prime + c2Prime);
		var h1Prime = (Math.atan2(Lab1.b, a1Prime) * 180.0) / Math.PI;
		if (h1Prime < 0.0)
			h1Prime += 360.0;
		var h2Prime = (Math.atan2(Lab2.b, a2Prime) * 180.0) / Math.PI;
		if (h2Prime < 0.0)
			h2Prime += 360.0;
		var hBarPrime = (Math.abs(h1Prime - h2Prime) > 180.0) ? (0.5 * (h1Prime + h2Prime + 360.0)) : (0.5 * (h1Prime + h2Prime));
		var t = 1.0 -
				0.17 * Math.cos(Math.PI * (      hBarPrime - 30.0) / 180.0) +
				0.24 * Math.cos(Math.PI * (2.0 * hBarPrime       ) / 180.0) +
				0.32 * Math.cos(Math.PI * (3.0 * hBarPrime +  6.0) / 180.0) -
				0.20 * Math.cos(Math.PI * (4.0 * hBarPrime - 63.0) / 180.0);
		if (Math.abs(h2Prime - h1Prime) <= 180.0) 
			dhPrime = h2Prime - h1Prime;
		else 
			dhPrime = (h2Prime <= h1Prime) ? (h2Prime - h1Prime + 360.0) : (h2Prime - h1Prime - 360.0);
		var dLPrime = Lab2.L - Lab1.L;
		var dCPrime = c2Prime - c1Prime;
		var dHPrime = 2.0 * Math.sqrt(c1Prime * c2Prime) * Math.sin(Math.PI * (0.5 * dhPrime) / 180.0);
		var sL = 1.0 + ((0.015 * (lBarPrime - 50.0) * (lBarPrime - 50.0)) / Math.sqrt(20.0 + (lBarPrime - 50.0) * (lBarPrime - 50.0)));
		var sC = 1.0 + 0.045 * cBarPrime;
		var sH = 1.0 + 0.015 * cBarPrime * t;
		var dTheta = 30.0 * Math.exp(-((hBarPrime - 275.0) / 25.0) * ((hBarPrime - 275.0) / 25.0));
		var cBarPrime7 = cBarPrime * cBarPrime * cBarPrime * cBarPrime * cBarPrime * cBarPrime * cBarPrime;
		var rC = Math.sqrt(cBarPrime7 / (cBarPrime7 + 6103515625.0));
		var rT = -2.0 * rC * Math.sin(Math.PI * (2.0 * dTheta) / 180.0);
		DE2000 = Math.sqrt(
				(dLPrime / (kL * sL)) * (dLPrime / (kL * sL)) +
				(dCPrime / (kC * sC)) * (dCPrime / (kC * sC)) +
				(dHPrime / (kH * sH)) * (dHPrime / (kH * sH)) +
				(dCPrime / (kC * sC)) * (dHPrime / (kH * sH)) * rT);
	}
	return(DE2000);
}

// Reference: Lab1
// Sample: Lab2
function DeltaECMC(L, C)
{
	var c1 = Math.sqrt(Lab1.a * Lab1.a + Lab1.b * Lab1.b);
	var c2 = Math.sqrt(Lab2.a * Lab2.a + Lab2.b * Lab2.b);
	var sl = (Lab1.L < 16.0) ? (0.511) : ((0.040975 * Lab1.L) / (1.0 + 0.01765 * Lab1.L));
	var sc = (0.0638 * c1) / (1.0 + 0.0131 * c1) + 0.638;
	var h1 = (c1 < 0.000001) ? 0.0 : ((Math.atan2(Lab1.b, Lab1.a) * 180.0) / Math.PI);
	while (h1 < 0.0)
		h1 += 360.0;
	while (h1 >= 360.0)
		h1 -= 360.0;
	var t = ((h1 >= 164.0) && (h1 <= 345.0)) ? (0.56 + Math.abs(0.2 * Math.cos((Math.PI * (h1 + 168.0)) / 180.0))) : (0.36 + Math.abs(0.4 * Math.cos((Math.PI * (h1 + 35.0)) / 180.0)));
	var c4 = c1 * c1 * c1 * c1;
	var f = Math.sqrt(c4 / (c4 + 1900.0));
	var sh = sc * (f * t + 1.0 - f);
	var delL = Lab1.L - Lab2.L;
	var delC = c1 - c2;
	var delA = Lab1.a - Lab2.a;
	var delB = Lab1.b - Lab2.b;
	var dH2 = delA * delA + delB * delB - delC * delC;
	var v1 = delL / (L * sl);
	var v2 = delC / (C * sc);
	var v3 = sh;
	if (L == 2.0)
	{
		DECMC_21 = Math.sqrt(v1 * v1 + v2 * v2 + (dH2 / (v3 * v3)));
	}
	else
	{
		DECMC_11 = Math.sqrt(v1 * v1 + v2 * v2 + (dH2 / (v3 * v3)));
	}
}

function SortByDeltaE( a, b ) {
	if ( a.DeltaE < b.DeltaE ){
		return -1;
	}
	if ( a.DeltaE > b.DeltaE ){
		return 1;
	}
	return 0;
}

function NearestColors(XYZ, Lab) {
	var ColorScale = GetColorScale(XYZ, Lab, Measurement.ColorScaleID);

	if (ColorScale.Name == "None") {
		return({Note: 'No color scale selected'});
	} else if (XYZ.Reference != ColorScale.ReferenceWhite) {
		return({Note: 'Reference White mismatch'});
	} else {
		let ReferenceColors = Object.entries(ColorScale.Index).map(entry => {
			let ReferenceName = entry[0];
			let Values = entry[1].split(/\s*,\s*/);
			let ReferenceColor = {
				L: parseFloat(Values[0]),
				a: parseFloat(Values[1]),
				b: parseFloat(Values[2])
			};
			let DeltaE = parseFloat(DeltaE1976(ReferenceColor, Lab));
			return {
				ReferenceName,
				ReferenceColor,
				DeltaE
			};
		});
		let NearestReferenceColors = ReferenceColors.sort(SortByDeltaE);
		NearestReferenceColors = NearestReferenceColors.slice(0, 3);
		return(NearestReferenceColors.map(item => item.ReferenceName + ' (<var>CIE1976 ΔE<sup>*</sup><sub>ab</sub>:</var> ' + item.DeltaE.toFixed(4) +')'));
	}
}

function BaselineSubtractionLightIntensity(LightIntensity) {

	var BaseLine = SpectralDataImport.BaseLine;
	var BaseLineSmoothing = SpectralDataImport.BaseLineSmoothing;

	if (BaseLineSmoothing > 0) {
		BaseLineSmoothing = BaseLineSmoothing / 100 + 1;
		for (var i in LightIntensity) {
			if (LightIntensity.hasOwnProperty(i)) {
				if (LightIntensity[i] <= BaseLine * BaseLineSmoothing) {
					LightIntensity[i] = BaseLine;
				}
			}
		}
	}
	return(LightIntensity);
}

function LightIntensity2Transmission(IncidentLight, TransmittedLight) {
	let Transmission = {};
	for (var i in IncidentLight) {
		if (IncidentLight.hasOwnProperty(i) && TransmittedLight.hasOwnProperty(i)) {
//			if (IncidentLight[i] > 0 && TransmittedLight[i] > 0) {
			if (IncidentLight[i] > 0) {
				Transmission[i] = TransmittedLight[i] / IncidentLight[i];
//			} else if (IncidentLight[i] > 0 && TransmittedLight[i] <= 0) {
//				Transmission[i] = 1.0;
			} else {
				Transmission[i] = 1.0;
			}
		}
	}
	return(Transmission);
}

function Transmission2NormalizedTransmission(Transmission) {
	let NormalizedTransmission = {};
	for (var i in Transmission) {
		if (Transmission.hasOwnProperty(i)) {
			NormalizedTransmission[i] = Math.pow(Transmission[i], Colorimetry.ReferenceCellPathLength/System.Cuvette.Thickness);
		}
	}
	return(NormalizedTransmission);
}

function LightIntensity2NormalizedLightIntensity(IncidentLight) {
	let NormalizedIncidentLight = {};

	let IncidentLightValue = [];
	for (var i in IncidentLight) {
		IncidentLightValue.push(IncidentLight[i]);
	}
	var NormalizationFactor = 1 / Math.max(...IncidentLightValue);

	for (var i in IncidentLight) {
		if (IncidentLight.hasOwnProperty(i)) {
			if (IncidentLight[i] > 0) {
				NormalizedIncidentLight[i] = IncidentLight[i] * NormalizationFactor;
			} else {
				NormalizedIncidentLight[i] = 0.0;
			}
		}
	}
	return(NormalizedIncidentLight);
}

function Transmission2Absorbance(Transmission) {
	let Absorbance = {};
	for (var i in Transmission) {
		if (Transmission.hasOwnProperty(i)) {
			if (Transmission[i] != 0) {
				Absorbance[i] = Math.log10(1 / Transmission[i]);
			} else {
				Absorbance[i] = 6.0;
			}
		}
	}
	return(Absorbance);
}

function Absorbance2SAC(Absorbance) {
	let SAC = {};
	for (var i in Absorbance) {
		if (Absorbance.hasOwnProperty(i)) {
			SAC[i] = Absorbance[i] / System.Cuvette.Thickness * 100;
		}
	}
	return(SAC);
}

function Transmission2XYZ(Intensity, Transmission) {
	let XYZ = {};

	if (!isEmpty(Intensity)) {

		var StdObs = window[Colorimetry.Observer];
		var StdObsX = 0;
		var StdObsY = 1;
		var StdObsZ = 2;

		var StdObsStart = parseFloat(FirstObjectKey(StdObs));
		var StdObsEnd = parseFloat(LastObjectKey(StdObs));

		XYZ.LuminousFlux = 0.0;

		if (Measurement.Mode.Name == 'Emission') {
			var SPD = LightIntensity2NormalizedLightIntensity(Intensity);
			var WaveLengthIncrement = SpectralDataImport.WaveLengthIncrement;

			var k = 0.0;
			for (var i in SPD) {
				if (SPD.hasOwnProperty(i) && StdObs.hasOwnProperty(i)) {
//					k += SPD[i] * StdObs[i][1] * WaveLengthIncrement;
//					k += StdObs[i][1] * WaveLengthIncrement;
					k += SPD[i] * WaveLengthIncrement;
				}
			}
			k = 1 / k;

			var k = 0.01;
console.log("Emissive Case", k, "increment", WaveLengthIncrement);
		} else {
			//Reflective or Transmissive Cases
			var SPD = window[Colorimetry.ReferenceWhite.SPD];
			var WaveLengthIncrement = Colorimetry.ReferenceWhite.WaveLengthIncrement;

			var k = 0.0;

			for (var i in SPD) {
				if (SPD.hasOwnProperty(i) && StdObs.hasOwnProperty(i)) {
					k += SPD[i] * StdObs[i][1] * WaveLengthIncrement;
				}
			}
console.log("Reflective or Transmissive Cases", k, "increment", WaveLengthIncrement);
			k = 1 / k;
		}

		if (!isEmpty(Transmission)) {
			// Reflective and Transmissive Cases
			var NormalizedTransmission = Transmission2NormalizedTransmission(Transmission);

			var wa = StdObsStart;
			var wp = StdObsStart;
			var tc = 0;

			for (var i in SPD) {
				if (SPD.hasOwnProperty(i) && StdObs.hasOwnProperty(i) && NormalizedTransmission.hasOwnProperty(i)) {
					tc++;
					if (tc == 1) {
						XYZ.X =  (RangeLoop(StdObsStart, StdObsStart, SPD, StdObs, StdObsX, k, WaveLengthIncrement) + RangeLoop(StdObsStart, i-WaveLengthIncrement, SPD, StdObs, StdObsX, k, WaveLengthIncrement)) / 2;
						XYZ.Y =  (RangeLoop(StdObsStart, StdObsStart, SPD, StdObs, StdObsY, k, WaveLengthIncrement) + RangeLoop(StdObsStart, i-WaveLengthIncrement, SPD, StdObs, StdObsY, k, WaveLengthIncrement)) / 2;
						XYZ.Z =  (RangeLoop(StdObsStart, StdObsStart, SPD, StdObs, StdObsZ, k, WaveLengthIncrement) + RangeLoop(StdObsStart, i-WaveLengthIncrement, SPD, StdObs, StdObsZ, k, WaveLengthIncrement)) / 2;
					} else if (tc == 2) {
						XYZ.X += (RangeLoop(wp+WaveLengthIncrement, wa, SPD, StdObs, StdObsX, k, WaveLengthIncrement) + RangeLoop(wa, i-WaveLengthIncrement, SPD, StdObs, StdObsX, k, WaveLengthIncrement)) / 2 * NormalizedTransmission[wa];
						XYZ.Y += (RangeLoop(wp+WaveLengthIncrement, wa, SPD, StdObs, StdObsY, k, WaveLengthIncrement) + RangeLoop(wa, i-WaveLengthIncrement, SPD, StdObs, StdObsY, k, WaveLengthIncrement)) / 2 * NormalizedTransmission[wa];
						XYZ.Z += (RangeLoop(wp+WaveLengthIncrement, wa, SPD, StdObs, StdObsZ, k, WaveLengthIncrement) + RangeLoop(wa, i-WaveLengthIncrement, SPD, StdObs, StdObsZ, k, WaveLengthIncrement)) / 2 * NormalizedTransmission[wa];
						tc = 1;
					}
					wp = wa;
					wa = parseFloat(i);
				}
			}
			XYZ.X += (RangeLoop(wp+WaveLengthIncrement, wa, SPD, StdObs, StdObsX, k, WaveLengthIncrement) + RangeLoop(wa, StdObsEnd-WaveLengthIncrement, SPD, StdObs, StdObsX, k, WaveLengthIncrement)) / 2;
			XYZ.Y += (RangeLoop(wp+WaveLengthIncrement, wa, SPD, StdObs, StdObsY, k, WaveLengthIncrement) + RangeLoop(wa, StdObsEnd-WaveLengthIncrement, SPD, StdObs, StdObsY, k, WaveLengthIncrement)) / 2;
			XYZ.Z += (RangeLoop(wp+WaveLengthIncrement, wa, SPD, StdObs, StdObsZ, k, WaveLengthIncrement) + RangeLoop(wa, StdObsEnd-WaveLengthIncrement, SPD, StdObs, StdObsZ, k, WaveLengthIncrement)) / 2;

			XYZ.X += (RangeLoop(wa+WaveLengthIncrement, StdObsEnd, SPD, StdObs, StdObsX, k, WaveLengthIncrement) + RangeLoop(StdObsEnd, StdObsEnd, SPD, StdObs, StdObsX, k, WaveLengthIncrement)) / 2;
			XYZ.Y += (RangeLoop(wa+WaveLengthIncrement, StdObsEnd, SPD, StdObs, StdObsY, k, WaveLengthIncrement) + RangeLoop(StdObsEnd, StdObsEnd, SPD, StdObs, StdObsY, k, WaveLengthIncrement)) / 2;
			XYZ.Z += (RangeLoop(wa+WaveLengthIncrement, StdObsEnd, SPD, StdObs, StdObsZ, k, WaveLengthIncrement) + RangeLoop(StdObsEnd, StdObsEnd, SPD, StdObs, StdObsZ, k, WaveLengthIncrement)) / 2;
console.log("using Transmission data");
		} else {
			// Emissive Case
			XYZ.X = RangeLoop(StdObsStart, StdObsEnd, SPD, StdObs, StdObsX, k, WaveLengthIncrement);
			XYZ.Y = RangeLoop(StdObsStart, StdObsEnd, SPD, StdObs, StdObsY, k, WaveLengthIncrement);
			XYZ.Z = RangeLoop(StdObsStart, StdObsEnd, SPD, StdObs, StdObsZ, k, WaveLengthIncrement);
console.log("using NO Transmission data");
		}

		// Luminous flux (lm)
		for (var i in SPD) {
			if (SPD.hasOwnProperty(i) && StdObs.hasOwnProperty(i)) {
				XYZ.LuminousFlux += 683.0 * SPD[i] * StdObs[i][1] * WaveLengthIncrement;
//				XYZ.LuminousFlux += SPD[i] * StdObs[i][1] * WaveLengthIncrement;
			}
		}
		XYZ.LuminousFlux = Round(XYZ.LuminousFlux, 1);

		if (Measurement.Mode.Name == 'Emission') {
			XYZ.Reference = "SPD import";
			XYZ.Observer = Colorimetry.Observer;
console.log("from Import SPD");
		} else {
console.log("from ReferenceWhite SPD");
			XYZ.Reference = Colorimetry.ReferenceWhite.Name;
			XYZ.Observer = Colorimetry.Observer;
		}
	} else if (Colorimetry.ReferenceWhite.X) {
		XYZ.X = Colorimetry.ReferenceWhite.X;
		XYZ.Y = Colorimetry.ReferenceWhite.Y;
		XYZ.Z = Colorimetry.ReferenceWhite.Z;
		XYZ.Reference = Colorimetry.ReferenceWhite.Name;
		XYZ.Observer = Colorimetry.Observer;
console.log("from ReferenceWhite XYZ");
	} else {
		XYZ = {
			Reference: "No SPD data"
		};
console.log("No SPD data");
		return(XYZ);
	}
//xyY2SPD();
console.log(XYZ);
	return(CheckXYZ(XYZ));
}

function RangeLoop(Start, Stop, SPD, StdObs, StdObsID, k, WaveLengthIncrement) {
	var XYZIncrement = 0.0;
	for (var i = Start; i <= Stop; i += WaveLengthIncrement) {
		if (SPD.hasOwnProperty(i)) {
			XYZIncrement += k * SPD[i] * StdObs[i][StdObsID] * WaveLengthIncrement;
		}
	}
	return(XYZIncrement);
}

function xyY2SPD() {
	let SPD = {};

	if (Colorimetry.ReferenceWhite.x != "") {
		var x = Colorimetry.ReferenceWhite.x;
		var y = Colorimetry.ReferenceWhite.y;

		var M = 0.0241 + 0.2562 * x - 0.7341 * y;
		var M1 = ( -1.3515 -  1.7703 * x +  5.9114 * y ) / M;
		var M2 = (  0.0300 - 31.4424 * x + 30.0717 * y ) / M;

		for (var i in SPD_CIE_Illuminant_D_Series) {
			if (SPD_CIE_Illuminant_D_Series.hasOwnProperty(i)) {
				SPD[i] = SPD_CIE_Illuminant_D_Series[i][0] + SPD_CIE_Illuminant_D_Series[i][1] * M1 + SPD_CIE_Illuminant_D_Series[i][2] * M2;
			}
		}
	} else {
		XYZ = {
			Reference: "No Reference White data"
		}
	}
	return(SPD);
}

function ScaleXYZ(XYZ) {
	XYZ = CheckXYZ(XYZ);
	if (SelectedColorimetry.Scaling.includes('0')) {
		var Scale = 100;
		XYZ.X = Scale * XYZ.X;
		XYZ.Y = Scale * XYZ.Y;
		XYZ.Z = Scale * XYZ.Z;
	}
	return(XYZ);
}

function ScalexyY(xyY) {
	if (SelectedColorimetry.Scaling.includes('1')) {
		var Scale = 100;
		xyY.Y = Scale * xyY.Y;
	}
	return(xyY);
}

function ScaleRGB(RGB) {
	if (SelectedColorimetry.Scaling.includes('2')) {
		var Scale = 255;
		RGB.R = Scale * RGB.R;
		RGB.G = Scale * RGB.G;
		RGB.B = Scale * RGB.B;
	}
	return(RGB);
}

function isEmpty(obj) {
	return Object.keys(obj).length === 0;
}

function FirstObjectKey(obj) {
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			return(`${i}`);
		}
	}
}

function LastObjectKey(obj) {
	for (var i in obj) {}
	if (obj.hasOwnProperty(i)) {
		return(`${i}`);
	}
}

function Round(value, digits) {
	var scale = 1+'e'+digits;
	var x = parseFloat(value); 
	if (!isNaN(x)) {
		// Attention: toFixed(digits) returns a string and will corrupt some functions!
		// value=(Math.round(value*scale)/scale).toFixed(digits);
		value=Math.round(value*scale)/scale;
	}
	return(value);
}

function toPrecision(value, prec) {
	var a = value.toPrecision(prec);		// Round number to required precision.
	return parseFloat(a);					// But remove the unncessary exponential notation.
}

function Randomize(obj) {
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			obj[i] = obj[i] * Math.random();
		}
	}
	return(obj);
}
