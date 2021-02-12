// Color converting functions adapted from "CIE Color Calculator by Bruce Justin Lindbloom"
// - function Determinant3x3(m)
// - function MtxInvert3x3(m, i)
// - function MtxTranspose3x3(m)
// - function GetRefWhite(SelectedRefWhite)
// - function GetRGBModel(SelectedRGBModel)
// - function GetAdaptation(SelectedAdaptationMethod)
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
// - function XYZ2HunterLab(XYZ)
// - function XYZ2CCT_McCamy(XYZ)
// smartColorimeter - Copyright © 2020-2021 by smartAquaMetering. All Rights Reserved. Licensed under GNU GPL v3 or higher..
// Based on a work at https://github.com/smartaquametering/smartPhotometer.
// For permissions beyond the scope of this license see https://github.com/smartaquametering/smartPhotometer/blob/main/LICENSE.
//
// Other useful staff:
// https://css-tricks.com/converting-color-spaces-in-javascript/ by Jon Kantner

var kE = 216.0 / 24389.0;
var kK = 24389.0 / 27.0;
var kKE = 8.0;

var SourceWhite = {};
var RefWhite = {};
var RGBModel = {};
var AdaptationMethod;

var MtxRGB2XYZ = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};
var MtxXYZ2RGB = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};
var MtxToRGB = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};
var MtxFromRGB = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};
var MtxAdaptMa = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};
var MtxAdaptMaI = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};

/* 360nm to 830nm in 5nm increments */
var CIE1931StdObs_x = [
	0.000129900000, 0.000232100000, 0.000414900000, 0.000741600000, 0.001368000000, 0.002236000000,
	0.004243000000, 0.007650000000, 0.014310000000, 0.023190000000, 0.043510000000, 0.077630000000, 0.134380000000, 0.214770000000, 0.283900000000, 0.328500000000,
	0.348280000000, 0.348060000000, 0.336200000000, 0.318700000000, 0.290800000000, 0.251100000000, 0.195360000000, 0.142100000000, 0.095640000000, 0.057950010000,
	0.032010000000, 0.014700000000, 0.004900000000, 0.002400000000, 0.009300000000, 0.029100000000, 0.063270000000, 0.109600000000, 0.165500000000, 0.225749900000,
	0.290400000000, 0.359700000000, 0.433449900000, 0.512050100000, 0.594500000000, 0.678400000000, 0.762100000000, 0.842500000000, 0.916300000000, 0.978600000000,
	1.026300000000, 1.056700000000, 1.062200000000, 1.045600000000, 1.002600000000, 0.938400000000, 0.854449900000, 0.751400000000, 0.642400000000, 0.541900000000,
	0.447900000000, 0.360800000000, 0.283500000000, 0.218700000000, 0.164900000000, 0.121200000000, 0.087400000000, 0.063600000000, 0.046770000000, 0.032900000000,
	0.022700000000, 0.015840000000, 0.011359160000, 0.008110916000, 0.005790346000, 0.004109457000, 0.002899327000, 0.002049190000, 0.001439971000, 0.000999949300,
	0.000690078600, 0.000476021300, 0.000332301100, 0.000234826100, 0.000166150500, 0.000117413000, 0.000083075270, 0.000058706520, 0.000041509940, 0.000029353260,
	0.000020673830, 0.000014559770, 0.000010253980, 0.000007221456, 0.000005085868, 0.000003581652, 0.000002522525, 0.000001776509, 0.000001251141];
var CIE1931StdObs_y = [
	0.000003917000, 0.000006965000, 0.000012390000, 0.000022020000, 0.000039000000, 0.000064000000,
	0.000120000000, 0.000217000000, 0.000396000000, 0.000640000000, 0.001210000000, 0.002180000000, 0.004000000000, 0.007300000000, 0.011600000000, 0.016840000000,
	0.023000000000, 0.029800000000, 0.038000000000, 0.048000000000, 0.060000000000, 0.073900000000, 0.090980000000, 0.112600000000, 0.139020000000, 0.169300000000,
	0.208020000000, 0.258600000000, 0.323000000000, 0.407300000000, 0.503000000000, 0.608200000000, 0.710000000000, 0.793200000000, 0.862000000000, 0.914850100000,
	0.954000000000, 0.980300000000, 0.994950100000, 1.000000000000, 0.995000000000, 0.978600000000, 0.952000000000, 0.915400000000, 0.870000000000, 0.816300000000,
	0.757000000000, 0.694900000000, 0.631000000000, 0.566800000000, 0.503000000000, 0.441200000000, 0.381000000000, 0.321000000000, 0.265000000000, 0.217000000000,
	0.175000000000, 0.138200000000, 0.107000000000, 0.081600000000, 0.061000000000, 0.044580000000, 0.032000000000, 0.023200000000, 0.017000000000, 0.011920000000,
	0.008210000000, 0.005723000000, 0.004102000000, 0.002929000000, 0.002091000000, 0.001484000000, 0.001047000000, 0.000740000000, 0.000520000000, 0.000361100000,
	0.000249200000, 0.000171900000, 0.000120000000, 0.000084800000, 0.000060000000, 0.000042400000, 0.000030000000, 0.000021200000, 0.000014990000, 0.000010600000,
	0.000007465700, 0.000005257800, 0.000003702900, 0.000002607800, 0.000001836600, 0.000001293400, 0.000000910930, 0.000000641530, 0.000000451810];
var CIE1931StdObs_z = [
	0.000606100000, 0.001086000000, 0.001946000000, 0.003486000000, 0.006450001000, 0.010549990000,
	0.020050010000, 0.036210000000, 0.067850010000, 0.110200000000, 0.207400000000, 0.371300000000, 0.645600000000, 1.039050100000, 1.385600000000, 1.622960000000,
	1.747060000000, 1.782600000000, 1.772110000000, 1.744100000000, 1.669200000000, 1.528100000000, 1.287640000000, 1.041900000000, 0.812950100000, 0.616200000000,
	0.465180000000, 0.353300000000, 0.272000000000, 0.212300000000, 0.158200000000, 0.111700000000, 0.078249990000, 0.057250010000, 0.042160000000, 0.029840000000,
	0.020300000000, 0.013400000000, 0.008749999000, 0.005749999000, 0.003900000000, 0.002749999000, 0.002100000000, 0.001800000000, 0.001650001000, 0.001400000000,
	0.001100000000, 0.001000000000, 0.000800000000, 0.000600000000, 0.000340000000, 0.000240000000, 0.000190000000, 0.000100000000, 0.000049999990, 0.000030000000,
	0.000020000000, 0.000010000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000,
	0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000,
	0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000,
	0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000];

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

function GetRefWhite(SelectedRefWhite, White)
{
	window[White].Y = 1.0;
	switch (SelectedRefWhite)
	{
		case 0:		// A (ASTM E308-01)
			window[White].X = 1.09850;
			window[White].Z = 0.35585;
			window[White].x = 0.44757;
			window[White].y = 0.40745;
			window[White].Name = "A/2°";
			break;
		case 1:		// B (Wyszecki & Stiles, p. 769)
			window[White].X = 0.99072;
			window[White].Z = 0.85223;
			window[White].x = 0.34842;
			window[White].y = 0.35161;
			window[White].Name = "B/2°";
			break;
		case 2:		// C (ASTM E308-01)
			window[White].X = 0.98074;
			window[White].Z = 1.18232;
			window[White].x = 0.31006;
			window[White].y = 0.31616;
			window[White].Name = "C/2°";
			break;
		case 3:		// D50 (ASTM E308-01)
			window[White].X = 0.96422;
			window[White].Z = 0.82521;
			window[White].x = 0.34567;
			window[White].y = 0.35850;
			window[White].Name = "D50/2°";
			break;
		case 4:		// D55 (ASTM E308-01)
			window[White].X = 0.95682;
			window[White].Z = 0.92149;
			window[White].x = 0.33242;
			window[White].y = 0.34743;
			window[White].Name = "D55/2°";
			break;
		case 5:		// D65 (ASTM E308-01)
			window[White].X = 0.95047;
			window[White].Z = 1.08883;
			window[White].x = 0.31273;
			window[White].y = 0.32902;
			window[White].Name = "D65/2°";
			break;
		case 6:		// D75 (ASTM E308-01)
			window[White].X = 0.94972;
			window[White].Z = 1.22638;
			window[White].x = 0.29902;
			window[White].y = 0.31485;
			window[White].Name = "D75/2°";
			break;
		case 7:		// E (ASTM E308-01)
			window[White].X = 1.00000;
			window[White].Z = 1.00000;
			window[White].x = 0.33333;
			window[White].y = 0.33333;
			window[White].Name = "E/2°";
			break;
		case 8:		// F1 (EasyRGB)
			window[White].X = 0.92834;
			window[White].Z = 1.03665;
			window[White].x = 0.31310;
			window[White].y = 0.33727;
			window[White].Name = "F1/2°";
			break;
		case 9:		// F2 (ASTM E308-01)
			window[White].X = 0.99186;
			window[White].Z = 0.67393;
			window[White].x = 0.37207;
			window[White].y = 0.37512;
			window[White].Name = "F2/2°";
			break;
		case 10:	// F3 (EasyRGB)
			window[White].X = 1.03754;
			window[White].Z = 0.49861;
			window[White].x = 0.40910;
			window[White].y = 0.39430;
			window[White].Name = "F3/2°";
			break;
		case 11:	// F4 (EasyRGB)
			window[White].X = 1.09147;
			window[White].Z = 0.38813;
			window[White].x = 0.44018;
			window[White].y = 0.40329;
			window[White].Name = "F4/2°";
			break;
		case 12:	// F5 (EasyRGB)
			window[White].X = 0.90872;
			window[White].Z = 0.98723;
			window[White].x = 0.31379;
			window[White].y = 0.34531;
			window[White].Name = "F5/2°";
			break;
		case 13:	// F6 (EasyRGB)
			window[White].X = 0.97309;
			window[White].Z = 0.60191;
			window[White].x = 0.37790;
			window[White].y = 0.38835;
			window[White].Name = "F6/2°";
			break;
		case 14:	// F7 (ASTM E308-01)
			window[White].X = 0.95041;
			window[White].Z = 1.08747;
			window[White].x = 0.31285;
			window[White].y = 0.32918;
			window[White].Name = "F7/2°";
			break;
		case 15:	// F8 (EasyRGB)
			window[White].X = 0.96413;
			window[White].Z = 0.82333;
			window[White].x = 0.34588;
			window[White].y = 0.35875;
			window[White].Name = "F8/2°";
			break;
		case 16:	// F9 (EasyRGB)
			window[White].X = 1.00365;
			window[White].Z = 0.67868;
			window[White].x = 0.37417;
			window[White].y = 0.37281;
			window[White].Name = "F9/2°";
			break;
		case 17:	// F10 (EasyRGB)
			window[White].X = 0.96174;
			window[White].Z = 0.81712;
			window[White].x = 0.34609;
			window[White].y = 0.35986;
			window[White].Name = "F10/2°";
			break;
		case 18:	// F11 (ASTM E308-01)
			window[White].X = 1.00962;
			window[White].Z = 0.64350;
			window[White].x = 0.38054;
			window[White].y = 0.37691;
			window[White].Name = "F11/2°";
			break;
		case 19:	// F12 (EasyRGB)
			window[White].X = 1.08046;
			window[White].Z = 0.39228;
			window[White].x = 0.43695;
			window[White].y = 0.40441;
			window[White].Name = "F12/2°";
			break;
		case 20:	// LED-B1 (https://en.wikipedia.org/wiki/Standard_illuminant)
			window[White].X = 1.118195;
			window[White].Z = 0.333987;
			window[White].x = 0.4560;
			window[White].y = 0.4078;
			window[White].Name = "LED-B1/2°";
			break;
		case 21:	// LED-B2 (https://en.wikipedia.org/wiki/Standard_illuminant)
			window[White].X = 1.085992;
			window[White].Z = 0.406530;
			window[White].x = 0.4357;
			window[White].y = 0.4012;
			window[White].Name = "LED-B2/2°";
			break;
		case 22:	// LED-B3 (https://en.wikipedia.org/wiki/Standard_illuminant)
			window[White].X = 1.008864;
			window[White].Z = 0.677142;
			window[White].x = 0.3756;
			window[White].y = 0.3723;
			window[White].Name = "LED-B3/2°";
			break;
		case 23:	// LED-B4 (https://en.wikipedia.org/wiki/Standard_illuminant)
			window[White].X = 0.977156;
			window[White].Z = 0.878355;
			window[White].x = 0.3422;
			window[White].y = 0.3502;
			window[White].Name = "LED-B4/2°";
			break;
		case 24:	// LED-B5 (https://en.wikipedia.org/wiki/Standard_illuminant)
			window[White].X = 0.963535;
			window[White].Z = 1.126700;
			window[White].x = 0.3118;
			window[White].y = 0.3236;
			window[White].Name = "LED-B5/2°";
			break;
		case 25:	// LED-BH1 (https://en.wikipedia.org/wiki/Standard_illuminant)
			window[White].X = 1.100344;
			window[White].Z = 0.359075;
			window[White].x = 0.4474;
			window[White].y = 0.4066;
			window[White].Name = "LED-BH1/2°";
			break;
		case 26:	// LED-RGB1 (https://en.wikipedia.org/wiki/Standard_illuminant)
			window[White].X = 1.082166;
			window[White].Z = 0.292567;
			window[White].x = 0.4557;
			window[White].y = 0.4211;
			window[White].Name = "LED-RGB1/2°";
			break;
		case 27:	// LED-V1 (https://en.wikipedia.org/wiki/Standard_illuminant)
			window[White].X = 1.002639;
			window[White].Z = 0.196130;
			window[White].x = 0.4560;
			window[White].y = 0.4548;
			window[White].Name = "LED-V1/2°";
			break;
		case 28:	// LED-V2 (https://en.wikipedia.org/wiki/Standard_illuminant)
			window[White].X = 1.001589;
			window[White].Z = 0.647417;
			window[White].x = 0.3781;
			window[White].y = 0.3775;
			window[White].Name = "LED-V2/2°";
			break;

		case 30:		// A (EasyRGB)
			window[White].X = 1.11144;
			window[White].Z = 0.35200;
			window[White].x = 0.45117;
			window[White].y = 0.40594;
			window[White].Name = "A/10°";
			break;
		case 31:		// B (EasyRGB)
			window[White].X = 0.991778;
			window[White].Z = 0.843493;
			window[White].x = 0.34980;
			window[White].y = 0.35270;
			window[White].Name = "B/10°";
			break;
		case 32:		// C (EasyRGB)
			window[White].X = 0.97285;
			window[White].Z = 1.16145;
			window[White].x = 0.31039;
			window[White].y = 0.31905;
			window[White].Name = "C/10°";
			break;
		case 33:		// D50 (EasyRGB)
			window[White].X = 0.96720;
			window[White].Z = 0.81427;
			window[White].x = 0.34773;
			window[White].y = 0.35952;
			window[White].Name = "D50/10°";
			break;
		case 34:		// D55 (EasyRGB)
			window[White].X = 0.95799;
			window[White].Z = 0.90926;
			window[White].x = 0.33411;
			window[White].y = 0.34877;
			window[White].Name = "D55/10°";
			break;
		case 35:		// D65 (EasyRGB)
			window[White].X = 0.94811;
			window[White].Z = 1.07304;
			window[White].x = 0.31382;
			window[White].y = 0.33100;
			window[White].Name = "D65/10°";
			break;
		case 36:		// D75 (EasyRGB)
			window[White].X = 0.94416;
			window[White].Z = 1.20641;
			window[White].x = 0.29968;
			window[White].y = 0.31740;
			window[White].Name = "D75/10°";
			break;
		case 37:		// E (EasyRGB)
			window[White].X = 1.00000;
			window[White].Z = 1.00000;
			window[White].x = 0.33333;
			window[White].y = 0.33333;
			window[White].Name = "E/10°";
			break;
		case 38:		// F1 (EasyRGB)
			window[White].X = 0.94791;
			window[White].Z = 1.03191;
			window[White].x = 0.31811;
			window[White].y = 0.33559;
			window[White].Name = "F1/10°";
			break;
		case 39:		// F2 (EasyRGB)
			window[White].X = 1.03280;
			window[White].Z = 0.69026;
			window[White].x = 0.37928;
			window[White].y = 0.36723;
			window[White].Name = "F2/10°";
			break;
		case 40:	// F3 (EasyRGB)
			window[White].X = 1.08968;
			window[White].Z = 0.51965;
			window[White].x = 0.41761;
			window[White].y = 0.38324;
			window[White].Name = "F3/10°";
			break;
		case 41:	// F4 (EasyRGB)
			window[White].X = 1.14961;
			window[White].Z = 0.40963;
			window[White].x = 0.44920;
			window[White].y = 0.39074;
			window[White].Name = "F4/10°";
			break;
		case 42:	// F5 (EasyRGB)
			window[White].X = 0.93369;
			window[White].Z = 0.98636;
			window[White].x = 0.31975;
			window[White].y = 0.34246;
			window[White].Name = "F5/10°";
			break;
		case 43:	// F6 (EasyRGB)
			window[White].X = 1.02148;
			window[White].Z = 0.62074;
			window[White].x = 0.38660;
			window[White].y = 0.37847;
			window[White].Name = "F6/10°";
			break;
		case 44:	// F7 (EasyRGB)
			window[White].X = 0.95792;
			window[White].Z = 1.07687;
			window[White].x = 0.31565;
			window[White].y = 0.32951;
			window[White].Name = "F7/10°";
			break;
		case 45:	// F8 (EasyRGB)
			window[White].X = 0.97115;
			window[White].Z = 0.81135;
			window[White].x = 0.34902;
			window[White].y = 0.35939;
			window[White].Name = "F8/10°";
			break;
		case 46:	// F9 (EasyRGB)
			window[White].X = 1.02116;
			window[White].Z = 0.67826;
			window[White].x = 0.37829;
			window[White].y = 0.37045;
			window[White].Name = "F9/10°";
			break;
		case 47:	// F10 (EasyRGB)
			window[White].X = 0.99001;
			window[White].Z = 0.83134;
			window[White].x = 0.35090;
			window[White].y = 0.35444;
			window[White].Name = "F10/10°";
			break;
		case 48:	// F11 (EasyRGB)
			window[White].X = 1.03866;
			window[White].Z = 0.65627;
			window[White].x = 0.38541;
			window[White].y = 0.37107;
			window[White].Name = "F11/10°";
			break;
		case 49:	// F12 (EasyRGB)
			window[White].X = 1.11428;
			window[White].Z = 0.40353;
			window[White].x = 0.44256;
			window[White].y = 0.39717;
			window[White].Name = "F12/10°";
			break;
	}
	return(window[White]);
}

function GetRGBModel(SelectedRGBModel)
{
	RGBModel.Yw = 1.00000;

	switch (SelectedRGBModel)
	{
		case 0:
			RGBModel.xr = 0.64;
			RGBModel.yr = 0.33;
			RGBModel.xg = 0.21;
			RGBModel.yg = 0.71;
			RGBModel.xb = 0.15;
			RGBModel.yb = 0.06;

			RGBModel.Name = "Adobe RGB (1998)";
			RGBModel.Reference = "D65/2°";
			RGBModel.Xw = 0.95047;
			RGBModel.Zw = 1.08883;
			RGBModel.Gamma =  2.2;
			RGBModel.GammaIndex = 2;
			break;
		case 1:
			RGBModel.xr = 0.625;
			RGBModel.yr = 0.340;
			RGBModel.xg = 0.280;
			RGBModel.yg = 0.595;
			RGBModel.xb = 0.155;
			RGBModel.yb = 0.070;

			RGBModel.Name = "AppleRGB";
			RGBModel.Reference = "D65/2°";
			RGBModel.Xw = 0.95047;
			RGBModel.Zw = 1.08883;
			RGBModel.Gamma =  1.8;
			RGBModel.GammaIndex = 1;
			break;
		case 2:
			RGBModel.xr = 0.7347;
			RGBModel.yr = 0.2653;
			RGBModel.xg = 0.2150;
			RGBModel.yg = 0.7750;
			RGBModel.xb = 0.1300;
			RGBModel.yb = 0.0350;

			RGBModel.Name = "Best RGB";
			RGBModel.Reference = "D50/2°";
			RGBModel.Xw = 0.96422;
			RGBModel.Zw = 0.82521;
			RGBModel.Gamma =  2.2;
			RGBModel.GammaIndex = 2;
			break;
		case 3:
			RGBModel.xr = 0.6888;
			RGBModel.yr = 0.3112;
			RGBModel.xg = 0.1986;
			RGBModel.yg = 0.7551;
			RGBModel.xb = 0.1265;
			RGBModel.yb = 0.0352;

			RGBModel.Name = "Beta RGB";
			RGBModel.Reference = "D50/2°";
			RGBModel.Xw = 0.96422;
			RGBModel.Zw = 0.82521;
			RGBModel.Gamma =  2.2;
			RGBModel.GammaIndex = 2;
			break;
		case 4:
			RGBModel.xr = 0.64;
			RGBModel.yr = 0.33;
			RGBModel.xg = 0.28;
			RGBModel.yg = 0.65;
			RGBModel.xb = 0.15;
			RGBModel.yb = 0.06;

			RGBModel.Name = "Bruce RGB";
			RGBModel.Reference = "D65/2°";
			RGBModel.Xw = 0.95047;
			RGBModel.Zw = 1.08883;
			RGBModel.Gamma =  2.2;
			RGBModel.GammaIndex = 2;
			break;
		case 5:
			RGBModel.xr = 0.735;
			RGBModel.yr = 0.265;
			RGBModel.xg = 0.274;
			RGBModel.yg = 0.717;
			RGBModel.xb = 0.167;
			RGBModel.yb = 0.009;

			RGBModel.Name = "CIE RGB";
			RGBModel.Reference = "E/2°";
			RGBModel.Xw = 1.00000;
			RGBModel.Zw = 1.00000;
			RGBModel.Gamma =  2.2;
			RGBModel.GammaIndex = 2;
			break;
		case 6:
			RGBModel.xr = 0.630;
			RGBModel.yr = 0.340;
			RGBModel.xg = 0.295;
			RGBModel.yg = 0.605;
			RGBModel.xb = 0.150;
			RGBModel.yb = 0.075;

			RGBModel.Name = "ColorMatch RGB";
			RGBModel.Reference = "D50/2°";
			RGBModel.Xw = 0.96422;
			RGBModel.Zw = 0.82521;
			RGBModel.Gamma =  1.8;
			RGBModel.GammaIndex = 1;
			break;
		case 7:
			RGBModel.xr = 0.696;
			RGBModel.yr = 0.300;
			RGBModel.xg = 0.215;
			RGBModel.yg = 0.765;
			RGBModel.xb = 0.130;
			RGBModel.yb = 0.035;

			RGBModel.Name = "Don RGB 4";
			RGBModel.Reference = "D50/2°";
			RGBModel.Xw = 0.96422;
			RGBModel.Zw = 0.82521;
			RGBModel.Gamma =  2.2;
			RGBModel.GammaIndex = 2;
			break;
		case 8:
			RGBModel.xr = 0.67;
			RGBModel.yr = 0.33;
			RGBModel.xg = 0.21;
			RGBModel.yg = 0.71;
			RGBModel.xb = 0.14;
			RGBModel.yb = 0.08;

			RGBModel.Name = "ECI RGB v2";
			RGBModel.Reference = "D50/2°";
			RGBModel.Xw = 0.96422;
			RGBModel.Zw = 0.82521;
			RGBModel.Gamma =  0.0;
			RGBModel.GammaIndex = 4;
			break;
		case 9:
			RGBModel.xr = 0.695;
			RGBModel.yr = 0.305;
			RGBModel.xg = 0.260;
			RGBModel.yg = 0.700;
			RGBModel.xb = 0.110;
			RGBModel.yb = 0.005;

			RGBModel.Name = "Ekta Space PS5";
			RGBModel.Reference = "D50/2°";
			RGBModel.Xw = 0.96422;
			RGBModel.Zw = 0.82521;
			RGBModel.Gamma =  2.2;
			RGBModel.GammaIndex = 2;
			break;
		case 10:
			RGBModel.xr = 0.67;
			RGBModel.yr = 0.33;
			RGBModel.xg = 0.21;
			RGBModel.yg = 0.71;
			RGBModel.xb = 0.14;
			RGBModel.yb = 0.08;

			RGBModel.Name = "NTSC RGB";
			RGBModel.Reference = "C/2°";
			RGBModel.Xw = 0.98074;
			RGBModel.Zw = 1.18232;
			RGBModel.Gamma =  2.2;
			RGBModel.GammaIndex = 2;
			break;
		case 11:
			RGBModel.xr = 0.64;
			RGBModel.yr = 0.33;
			RGBModel.xg = 0.29;
			RGBModel.yg = 0.60;
			RGBModel.xb = 0.15;
			RGBModel.yb = 0.06;

			RGBModel.Name = "PAL/SECAM RGB";
			RGBModel.Reference = "D65/2°";
			RGBModel.Xw = 0.95047;
			RGBModel.Zw = 1.08883;
			RGBModel.Gamma =  2.2;
			RGBModel.GammaIndex = 2;
			break;
		case 12:
			RGBModel.xr = 0.7347;
			RGBModel.yr = 0.2653;
			RGBModel.xg = 0.1596;
			RGBModel.yg = 0.8404;
			RGBModel.xb = 0.0366;
			RGBModel.yb = 0.0001;

			RGBModel.Name = "ProPhoto RGB";
			RGBModel.Reference = "D50/2°";
			RGBModel.Xw = 0.96422;
			RGBModel.Zw = 0.82521;
			RGBModel.Gamma =  1.8;
			RGBModel.GammaIndex = 1;
			break;
		case 13:
			RGBModel.xr = 0.630;
			RGBModel.yr = 0.340;
			RGBModel.xg = 0.310;
			RGBModel.yg = 0.595;
			RGBModel.xb = 0.155;
			RGBModel.yb = 0.070;

			RGBModel.Name = "SMPTE-C RGB";
			RGBModel.Reference = "D65/2°";
			RGBModel.Xw = 0.95047;
			RGBModel.Zw = 1.08883;
			RGBModel.Gamma =  2.2;
			RGBModel.GammaIndex = 2;
			break;
		case 14:
			RGBModel.xr = 0.64;
			RGBModel.yr = 0.33;
			RGBModel.xg = 0.30;
			RGBModel.yg = 0.60;
			RGBModel.xb = 0.15;
			RGBModel.yb = 0.06;

			RGBModel.Name = "sRGB";
			RGBModel.Reference = "D65/2°";
			RGBModel.Xw = 0.95047;
			RGBModel.Zw = 1.08883;
			RGBModel.Gamma = -2.2;
			RGBModel.GammaIndex = 3;
			break;
		case 15:
			RGBModel.xr = 0.735;
			RGBModel.yr = 0.265;
			RGBModel.xg = 0.115;
			RGBModel.yg = 0.826;
			RGBModel.xb = 0.157;
			RGBModel.yb = 0.018;

			RGBModel.Name = "Wide Gamut RGB";
			RGBModel.Reference = "D50/2°";
			RGBModel.Xw = 0.96422;
			RGBModel.Zw = 0.82521;
			RGBModel.Gamma =  2.2;
			RGBModel.GammaIndex = 2;
			break;
	}

	var m = {m00:RGBModel.xr/RGBModel.yr, m01:RGBModel.xg/RGBModel.yg, m02:RGBModel.xb/RGBModel.yb, m10:1.0, m11:1.0, m12:1.0, m20:(1.0-RGBModel.xr-RGBModel.yr)/RGBModel.yr, m21:(1.0-RGBModel.xg-RGBModel.yg)/RGBModel.yg, m22:(1.0-RGBModel.xb-RGBModel.yb)/RGBModel.yb};
	var mi = {m00:1.0, m01:0.0, m02:0.0, m10:0.0, m11:1.0, m12:0.0, m20:0.0, m21:0.0, m22:1.0};
	MtxInvert3x3(m, mi);

	var sr = RGBModel.Xw * mi.m00 + RGBModel.Yw * mi.m01 + RGBModel.Zw * mi.m02;
	var sg = RGBModel.Xw * mi.m10 + RGBModel.Yw * mi.m11 + RGBModel.Zw * mi.m12;
	var sb = RGBModel.Xw * mi.m20 + RGBModel.Yw * mi.m21 + RGBModel.Zw * mi.m22;

	MtxRGB2XYZ.m00 = sr * m.m00;
	MtxRGB2XYZ.m01 = sg * m.m01;
	MtxRGB2XYZ.m02 = sb * m.m02;
	MtxRGB2XYZ.m10 = sr * m.m10;
	MtxRGB2XYZ.m11 = sg * m.m11;
	MtxRGB2XYZ.m12 = sb * m.m12;
	MtxRGB2XYZ.m20 = sr * m.m20;
	MtxRGB2XYZ.m21 = sg * m.m21;
	MtxRGB2XYZ.m22 = sb * m.m22;

	MtxTranspose3x3(MtxRGB2XYZ);

	MtxInvert3x3(MtxRGB2XYZ, MtxXYZ2RGB);
}

//function GetRGBModel.Gamma()
//{
//	switch (SelectedRGBModel.Gamma)
//	{
//		case 0:	/* 1.0 */
//			RGBModel.Gamma = 1.0;
//			break;
//		case 1:	/* 1.8 */
//			RGBModel.Gamma = 1.8;
//			break;
//		case 2:	/* 2.2 */
//			RGBModel.Gamma = 2.2;
//			break;
//		case 3:	/* sRGB */
//			RGBModel.Gamma = -2.2;
//			break;
//		case 4: /* L* */
//			RGBModel.Gamma = 0.0;
//			break;
//	}
//	return(RGBModel.Gamma);
//}

function GetAdaptation(SelectedAdaptationMethod)
{
	switch (SelectedAdaptationMethod)
	{
		case 0:	/* Bradford */
			MtxAdaptMa.m00 =  0.8951;
			MtxAdaptMa.m01 = -0.7502;
			MtxAdaptMa.m02 =  0.0389;
			MtxAdaptMa.m10 =  0.2664;
			MtxAdaptMa.m11 =  1.7135;
			MtxAdaptMa.m12 = -0.0685;
			MtxAdaptMa.m20 = -0.1614;
			MtxAdaptMa.m21 =  0.0367;
			MtxAdaptMa.m22 =  1.0296;

			MtxInvert3x3(MtxAdaptMa, MtxAdaptMaI);

			AdaptationMethod = "Bradford";
			RGBModel.AdaptationMethod = "Bradford";
			break;
		case 1:	/* von Kries */
			MtxAdaptMa.m00 =  0.40024;
			MtxAdaptMa.m01 = -0.22630;
			MtxAdaptMa.m02 =  0.00000;
			MtxAdaptMa.m10 =  0.70760;
			MtxAdaptMa.m11 =  1.16532;
			MtxAdaptMa.m12 =  0.00000;
			MtxAdaptMa.m20 = -0.08081;
			MtxAdaptMa.m21 =  0.04570;
			MtxAdaptMa.m22 =  0.91822;

			MtxInvert3x3(MtxAdaptMa, MtxAdaptMaI);

			AdaptationMethod = "von Kries";
			RGBModel.AdaptationMethod = "von Kries";
			break;
		case 2:	/* XYZ Scaling */
		case 3:	/* None */
			MtxAdaptMa.m00 = 1.0;
			MtxAdaptMa.m01 = 0.0;
			MtxAdaptMa.m02 = 0.0;
			MtxAdaptMa.m10 = 0.0;
			MtxAdaptMa.m11 = 1.0;
			MtxAdaptMa.m12 = 0.0;
			MtxAdaptMa.m20 = 0.0;
			MtxAdaptMa.m21 = 0.0;
			MtxAdaptMa.m22 = 1.0;

			MtxAdaptMaI.m00 = 1.0;
			MtxAdaptMaI.m01 = 0.0;
			MtxAdaptMaI.m02 = 0.0;
			MtxAdaptMaI.m10 = 0.0;
			MtxAdaptMaI.m11 = 1.0;
			MtxAdaptMaI.m12 = 0.0;
			MtxAdaptMaI.m20 = 0.0;
			MtxAdaptMaI.m21 = 0.0;
			MtxAdaptMaI.m22 = 1.0;

			AdaptationMethod = "XYZ Scaling / None";
			RGBModel.AdaptationMethod = "XYZ Scaling / None";
			break;
	}
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
	XYZ = CheckXYZ(XYZ);
	let RGB = {};

	var X2 = XYZ.X;
	var Y2 = XYZ.Y;
	var Z2 = XYZ.Z;

	if (SelectedAdaptationMethod != 3)
	{
		var As = RefWhite.X * MtxAdaptMa.m00 + RefWhite.Y * MtxAdaptMa.m10 + RefWhite.Z * MtxAdaptMa.m20;
		var Bs = RefWhite.X * MtxAdaptMa.m01 + RefWhite.Y * MtxAdaptMa.m11 + RefWhite.Z * MtxAdaptMa.m21;
		var Cs = RefWhite.X * MtxAdaptMa.m02 + RefWhite.Y * MtxAdaptMa.m12 + RefWhite.Z * MtxAdaptMa.m22;

		var Ad = RGBModel.Xw * MtxAdaptMa.m00 + RGBModel.Yw * MtxAdaptMa.m10 + RGBModel.Zw * MtxAdaptMa.m20;
		var Bd = RGBModel.Xw * MtxAdaptMa.m01 + RGBModel.Yw * MtxAdaptMa.m11 + RGBModel.Zw * MtxAdaptMa.m21;
		var Cd = RGBModel.Xw * MtxAdaptMa.m02 + RGBModel.Yw * MtxAdaptMa.m12 + RGBModel.Zw * MtxAdaptMa.m22;

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

	RGB.Model = RGBModel.Name;
	RGB.Source = SourceWhite.Name;
	RGB.Reference = RGBModel.Reference;
	RGB.Adaptation = RGBModel.AdaptationMethod;
	RGB.Gamma = RGBModel.Gamma;
	RGB.HEX = RGB2Hex(RGB);
	return(RGB);
}

function RGB2Hex({R, G, B})
{
	R = (Math.round(R * 255)).toString(16);
	G = (Math.round(G * 255)).toString(16);
	B = (Math.round(B * 255)).toString(16);
	if (R.length == 1)
		R = "0" + R;
	if (G.length == 1)
		G = "0" + G;
	if (B.length == 1)
		B = "0" + B;
	return "#" + R + G + B;
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

	if (SelectedAdaptationMethod != 3)
	{
		var Ad = RefWhite.X * MtxAdaptMa.m00 + RefWhite.Y * MtxAdaptMa.m10 + RefWhite.Z * MtxAdaptMa.m20;
		var Bd = RefWhite.X * MtxAdaptMa.m01 + RefWhite.Y * MtxAdaptMa.m11 + RefWhite.Z * MtxAdaptMa.m21;
		var Cd = RefWhite.X * MtxAdaptMa.m02 + RefWhite.Y * MtxAdaptMa.m12 + RefWhite.Z * MtxAdaptMa.m22;

		var As = RGBModel.Xw * MtxAdaptMa.m00 + RGBModel.Yw * MtxAdaptMa.m10 + RGBModel.Zw * MtxAdaptMa.m20;
		var Bs = RGBModel.Xw * MtxAdaptMa.m01 + RGBModel.Yw * MtxAdaptMa.m11 + RGBModel.Zw * MtxAdaptMa.m21;
		var Cs = RGBModel.Xw * MtxAdaptMa.m02 + RGBModel.Yw * MtxAdaptMa.m12 + RGBModel.Zw * MtxAdaptMa.m22;
		
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
	return(XYZ);
}

function Compand(linear)
{
	var companded;
	if (RGBModel.Gamma > 0.0)
	{
		companded = (linear >= 0.0) ? Math.pow(linear, 1.0 / RGBModel.Gamma) : -Math.pow(-linear, 1.0 / RGBModel.Gamma);
	}
	else if (RGBModel.Gamma < 0.0)
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
	if (RGBModel.Gamma > 0.0)
	{
		linear = (companded >= 0.0) ? Math.pow(companded, RGBModel.Gamma) : -Math.pow(-companded, RGBModel.Gamma);
	}
	else if (RGBModel.Gamma < 0.0)
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
	XYZ = CheckXYZ(XYZ);
	let xyY = {};

	var Den = XYZ.X + XYZ.Y + XYZ.Z;
	/* TODO: divide by zero handling */
	if (Den > 0.0)
	{
		xyY.x = XYZ.X / Den;
		xyY.y = XYZ.Y / Den;
	}
	else
	{
		xyY.x = RefWhite.X / (RefWhite.X + RefWhite.Y + RefWhite.Z);
		xyY.y = RefWhite.Y / (RefWhite.X + RefWhite.Y + RefWhite.Z);
	}
	xyY.Y = XYZ.Y;
	xyY.Source = SourceWhite.Name;
	xyY.Reference = RefWhite.Name;
	return(xyY);
}

function XYZ2Lab(XYZ)
{
	XYZ = CheckXYZ(XYZ);
	let Lab = {};

	var xr = XYZ.X / RefWhite.X;
	var yr = XYZ.Y / RefWhite.Y;
	var zr = XYZ.Z / RefWhite.Z;

	var fx = (xr > kE) ? Math.pow(xr, 1.0 / 3.0) : ((kK * xr + 16.0) / 116.0);
	var fy = (yr > kE) ? Math.pow(yr, 1.0 / 3.0) : ((kK * yr + 16.0) / 116.0);
	var fz = (zr > kE) ? Math.pow(zr, 1.0 / 3.0) : ((kK * zr + 16.0) / 116.0);

	Lab.L = (116.0 * fy - 16.0).toFixed(4);
	Lab.a = (500.0 * (fx - fy)).toFixed(4);
	Lab.b = (200.0 * (fy - fz)).toFixed(4);

	Lab.L = (Lab.L < 0.0) ? 0.0 : (Lab.L > 100.0) ? 100.0 : Lab.L;
	Lab.Source = SourceWhite.Name;
	Lab.Reference = RefWhite.Name;
	return(Lab);
}

function XYZ2Luv(XYZ)
{
	XYZ = CheckXYZ(XYZ);
	let Luv = {};

	var Den = XYZ.X + 15.0 * XYZ.Y + 3.0 * XYZ.Z;
	var up = (Den > 0.0) ? ((4.0 * XYZ.X) / (XYZ.X + 15.0 * XYZ.Y + 3.0 * XYZ.Z)) : 0.0;
	var vp = (Den > 0.0) ? ((9.0 * XYZ.Y) / (XYZ.X + 15.0 * XYZ.Y + 3.0 * XYZ.Z)) : 0.0;

	var urp = (4.0 * RefWhite.X) / (RefWhite.X + 15.0 * RefWhite.Y + 3.0 * RefWhite.Z);
	var vrp = (9.0 * RefWhite.Y) / (RefWhite.X + 15.0 * RefWhite.Y + 3.0 * RefWhite.Z);
	
	var yr = XYZ.Y / RefWhite.Y;

	Luv.L = (yr > kE) ? (116.0 * Math.pow(yr, 1.0 / 3.0) - 16.0) : (kK * yr);
	Luv.u = 13.0 * Luv.L * (up - urp);
	Luv.v = 13.0 * Luv.L * (vp - vrp);

	Luv.L = (Luv.L < 0.0) ? 0.0 : (Luv.L > 100.0) ? 100.0 : Luv.L;

	Luv.L = Luv.L.toFixed(4);
	Luv.u = Luv.u.toFixed(4);
	Luv.v = Luv.v.toFixed(4);
	Luv.Source = SourceWhite.Name;
	Luv.Reference = RefWhite.Name;
	return(Luv);
}

function Lab2LCHab(Lab)
{
	let LCHab = {};

	LCHab.L = Lab.L;
	LCHab.C = Math.sqrt(Lab.a * Lab.a + Lab.b * Lab.b);
	LCHab.H = 180.0 * Math.atan2(Lab.b, Lab.a) / Math.PI;

	LCHab.L = (LCHab.L < 0.0) ? 0.0 : (LCHab.L > 100.0) ? 100.0 : LCHab.L;
	LCHab.C = (LCHab.C < 0.0) ? 0.0 : LCHab.C;
	while (LCHab.H < 0.0)
	{
		LCHab.H += 360.0;
	}
	while (LCHab.H > 0.0)
	{
		LCHab.H -= 360.0;
	}

	LCHab.L = LCHab.L.toFixed(4);
	LCHab.C = LCHab.C.toFixed(4);
	LCHab.H = LCHab.H.toFixed(4);
	return(LCHab);
}

function LCHab2Lab(LCHab)
{
	let Lab = {};

	Lab.L = (LCHab.L).toFixed(4);
	Lab.a = (LCHab.C * Math.cos(LCHab.H * Math.PI / 180.0)).toFixed(4);
	Lab.b = (LCHab.C * Math.sin(LCHab.H * Math.PI / 180.0)).toFixed(4);

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

	LCHuv.L = LCHuv.L.toFixed(4);
	LCHuv.C = LCHuv.C.toFixed(4);
	LCHuv.H = LCHuv.H.toFixed(4);
	return(LCHuv);
}

function LCHuv2Luv(LCHuv)
{
	let Luv = {};

	Luv.L = LCHuv.L;
	Luv.u = LCHuv.C * Math.cos(LCHuv.H * Math.PI / 180.0);
	Luv.v = LCHuv.C * Math.sin(LCHuv.H * Math.PI / 180.0);

	Luv.L = (Luv.L < 0.0) ? 0.0 : (Luv.L > 100.0) ? 100.0 : Luv.L;
	return(Luv);
}

function XYZ2HunterLab(XYZ)
{
	XYZ = CheckXYZ(XYZ);
	var Ka = (175.0 / 198.04) * (RefWhite.Y * 100 + RefWhite.X * 100);
	var Kb = (70.0 / 218.11) * (RefWhite.Y * 100 + RefWhite.Z * 100);

	let HunterLab = {};

	HunterLab.L = 100.0 * Math.sqrt(XYZ.Y / RefWhite.Y );
	HunterLab.a = Ka * (((XYZ.X / RefWhite.X) - (XYZ.Y / RefWhite.Y) ) / Math.sqrt(XYZ.Y / RefWhite.Y));
	HunterLab.b = Kb * (((XYZ.Y / RefWhite.Y) - (XYZ.Z / RefWhite.Z) ) / Math.sqrt(XYZ.Y / RefWhite.Y));

	HunterLab.L = HunterLab.L.toFixed(4);
	HunterLab.a = HunterLab.a.toFixed(4);
	HunterLab.b = HunterLab.b.toFixed(4);
	HunterLab.Source = SourceWhite.Name;
	HunterLab.Reference = RefWhite.Name;
	return(HunterLab);
}

function XYZ2CCT_McCamy(XYZ)
{
	XYZ = CheckXYZ(XYZ);
	let xyY = XYZ2xyY(XYZ);

	var n = (xyY.x - 0.3320) / (0.1858 - xyY.y);
	var CCT = (449.0 * Math.pow(n, 3)) + (3525.0 * Math.pow(n, 2)) + (6823.3 * n) + 5520.33;

	CCT = ((CCT >= (10000.0 / 6.0)) && (CCT <= 25000.0)) ? CCT.toFixed(1) : "N/A";
	return(CCT);
}

function XYZ2CCT_Robertson(XYZ)
{
	XYZ = CheckXYZ(XYZ);
	var CCT;

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
			CCT = -10.0;	/* cannot convert: color is too blue */
			return;
		}
		if ((i > 0) && (thisVertDist <= 0.0))
			break;	/* found lines bounding (us, vs) : i-1 and i */
		prevVertDist = thisVertDist;
	}
	if (i == 31)
	{
		CCT = -10.0;	/* cannot convert: color is too red */
	}
	else
	{
		var thisPerpDist = thisVertDist / Math.sqrt(1.0 + t[i] * t[i]);
		var prevPerpDist = prevVertDist / Math.sqrt(1.0 + t[i-1] * t[i-1]);
		var w = prevPerpDist / (prevPerpDist - thisPerpDist);		/* w = lerping parameter, 0 : i-1, 1 : i */
		CCT = 1.0 / ((rt[i] - rt[i-1]) * w + rt[i-1]);			/* 1.0 / (LERP(rt[i-1], rt[i], w)) */
	}
	CCT = ((CCT >= (10000.0 / 6.0)) && (CCT <= 25000.0)) ? CCT.toFixed(1) : "N/A";
	return(CCT);
}

function XYZ2DominantWavelength(XYZ)
{
	XYZ = CheckXYZ(XYZ);
	let xyY = XYZ2xyY(XYZ);

	var xr = RefWhite.X / (RefWhite.X + RefWhite.Y + RefWhite.Z);
	var yr = RefWhite.Y / (RefWhite.X + RefWhite.Y + RefWhite.Z);

	var DominantWavelength;
	var count = 0;
	var tArray = [0.0, 0.0];	// t
	var wArray = [0.0, 0.0];	// wavelength
	var cArray = [0, 0];		// cycle

	var nm;

	var a = xyY.x - xr;
	var b = xyY.y - yr;

	if ((a >= -0.000001) && (a <= 0.000001) && (b >= -0.000001) && (b <= 0.000001))
	{
		return(0.0);	// cannot compute the dominant wavelength, because (xyY.x, xyY.y) is the same as (xr, yr)
	}

	for (nm = 360; nm <= 830; nm += 5)
	{
		var i1 = (nm - 360) / 5;
		var i2 = (nm == 830) ? 0 : i1 + 1;
		var nm2 = 5 * i2 + 360;

		var x1 = CIE1931StdObs_x[i1] / (CIE1931StdObs_x[i1] + CIE1931StdObs_y[i1] + CIE1931StdObs_z[i1]);
		var y1 = CIE1931StdObs_y[i1] / (CIE1931StdObs_x[i1] + CIE1931StdObs_y[i1] + CIE1931StdObs_z[i1]);
		var x2 = CIE1931StdObs_x[i2] / (CIE1931StdObs_x[i2] + CIE1931StdObs_y[i2] + CIE1931StdObs_z[i2]);
		var y2 = CIE1931StdObs_y[i2] / (CIE1931StdObs_x[i2] + CIE1931StdObs_y[i2] + CIE1931StdObs_z[i2]);

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

	DominantWavelength = (DominantWavelength != 0.0) ? DominantWavelength.toFixed(1) : "N/A";
	return(DominantWavelength);
}

// Reference: Lab1
// Sample: Lab2
function DeltaE1976(Lab1, Lab2)
{
	var delL = Lab1.L - Lab2.L;
	var dela = Lab1.a - Lab2.a;
	var delb = Lab1.b - Lab2.b;
	var DE1976 = Math.sqrt(delL * delL + dela * dela + delb * delb);
	return(DE1976.toFixed(6));
}

// Reference: Lab1
// Sample: Lab2
function DeltaE1994(Lab1, Lab2)
{
	var textiles = false;
	var k1 = (textiles == true) ? 0.048 : 0.045;
	var k2 = (textiles == true) ? 0.014 : 0.015;
	var kL = (textiles == true) ? 2.0 : 1.0;
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

//	if (textiles == true)
//	{
//		DE1994_Textiles = Math.sqrt(vL * vL + vC * vC + vH * vH);
//	}
//	else
//	{
//		DE1994_GraphicArts = Math.sqrt(vL * vL + vC * vC + vH * vH);
//	}

	var DE1994 = Math.sqrt(vL * vL + vC * vC + vH * vH);
	return(DE1994.toFixed(6));
}

// Reference: Lab1
// Sample: Lab2
function DeltaE2000(Lab1, Lab2)
{
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
	var DE2000 = Math.sqrt(
				(dLPrime / (kL * sL)) * (dLPrime / (kL * sL)) +
				(dCPrime / (kC * sC)) * (dCPrime / (kC * sC)) +
				(dHPrime / (kH * sH)) * (dHPrime / (kH * sH)) +
				(dCPrime / (kC * sC)) * (dHPrime / (kH * sH)) * rT);
	return(DE2000.toFixed(6));
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
