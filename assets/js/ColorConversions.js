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
// - function ChromaticAdaptationXYZ(XYZ)
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

// Spectral Tristimulus Values (Color-Matching Functions) x¯ , y¯ , z¯ of the
// CIE 1931 Standard (2°) Observer (CIE 15.3:2004, ASTM E308−18)
//
// 360nm to 830nm in 5nm increments
//
// Line  1: 360 - 385nm
// Line  2: 390 - 435nm
// Line  3: 440 - 485nm
// Line  4: 490 - 535nm
// Line  5: 540 - 585nm
// Line  6: 590 - 635nm
// Line  7: 640 - 685nm
// Line  8: 690 - 735nm
// Line  9: 740 - 785nm
// Line 10: 790 - 830nm
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

// Spectral Tristimulus Values (Color-Matching Functions) x¯ , y¯ , z¯ of the
// CIE 1964 Standard (10°) Observer (CIE 15.3:2004, ASTM E308−18)
//
// 360nm to 830nm in 5nm increments
//
// Line  1: 360 - 385nm
// Line  2: 390 - 435nm
// Line  3: 440 - 485nm
// Line  4: 490 - 535nm
// Line  5: 540 - 585nm
// Line  6: 590 - 635nm
// Line  7: 640 - 685nm
// Line  8: 690 - 735nm
// Line  9: 740 - 785nm
// Line 10: 790 - 830nm
var CIE1964StdObs_x10 = [
	0.000000122200, 0.000000919270, 0.000005958600, 0.000033266000, 0.000159952000, 0.000662440000,
	0.002361600000, 0.007242300000, 0.019109700000, 0.043400000000, 0.084736000000, 0.140638000000, 0.204492000000, 0.264737000000, 0.314679000000, 0.357719000000,
	0.383734000000, 0.386726000000, 0.370702000000, 0.342957000000, 0.302273000000, 0.254085000000, 0.195618000000, 0.132349000000, 0.080507000000, 0.041072000000,
	0.016172000000, 0.005132000000, 0.003816000000, 0.015444000000, 0.037465000000, 0.071358000000, 0.117749000000, 0.172953000000, 0.236491000000, 0.304213000000,
	0.376772000000, 0.451584000000, 0.529826000000, 0.616053000000, 0.705224000000, 0.793832000000, 0.878655000000, 0.951162000000, 1.014160000000, 1.074300000000,
	1.118520000000, 1.134300000000, 1.123990000000, 1.089100000000, 1.030480000000, 0.950740000000, 0.856297000000, 0.754930000000, 0.647467000000, 0.535110000000,
	0.431567000000, 0.343690000000, 0.268329000000, 0.204300000000, 0.152568000000, 0.112210000000, 0.081260600000, 0.057930000000, 0.040850800000, 0.028623000000,
	0.019941300000, 0.013842000000, 0.009576880000, 0.006605200000, 0.004552630000, 0.003144700000, 0.002174960000, 0.001505700000, 0.001044760000, 0.000727450000,
	0.000508258000, 0.000356380000, 0.000250969000, 0.000177730000, 0.000126390000, 0.000090151000, 0.000064525800, 0.000046339000, 0.000033411700, 0.000024209000,
	0.000017611500, 0.000012855000, 0.000009413630, 0.000006913000, 0.000005093470, 0.000003767100, 0.000002795310, 0.000002082000, 0.000001553140];

var CIE1964StdObs_y10 = [
	0.000000013398, 0.000000100650, 0.000000651100, 0.000003625000, 0.000017364000, 0.000071560000,
	0.000253400000, 0.000768500000, 0.002004400000, 0.004509000000, 0.008756000000, 0.014456000000, 0.021391000000, 0.029497000000, 0.038676000000, 0.049602000000,
	0.062077000000, 0.074704000000, 0.089456000000, 0.106256000000, 0.128201000000, 0.152761000000, 0.185190000000, 0.219940000000, 0.253589000000, 0.297665000000,
	0.339133000000, 0.395379000000, 0.460777000000, 0.531360000000, 0.606741000000, 0.685660000000, 0.761757000000, 0.823330000000, 0.875211000000, 0.923810000000,
	0.961988000000, 0.982200000000, 0.991761000000, 0.999110000000, 0.997340000000, 0.982380000000, 0.955552000000, 0.915175000000, 0.868934000000, 0.825623000000,
	0.777405000000, 0.720353000000, 0.658341000000, 0.593878000000, 0.527963000000, 0.461834000000, 0.398057000000, 0.339554000000, 0.283493000000, 0.228254000000,
	0.179828000000, 0.140211000000, 0.107633000000, 0.081187000000, 0.060281000000, 0.044096000000, 0.031800400000, 0.022601700000, 0.015905100000, 0.011130300000,
	0.007748800000, 0.005375100000, 0.003717740000, 0.002564560000, 0.001768470000, 0.001222390000, 0.000846190000, 0.000586440000, 0.000407410000, 0.000284041000,
	0.000198730000, 0.000139550000, 0.000098428000, 0.000069819000, 0.000049737000, 0.000035540500, 0.000025486000, 0.000018338400, 0.000013249000, 0.000009619600,
	0.000007012800, 0.000005129800, 0.000003764730, 0.000002770810, 0.000002046130, 0.000001516770, 0.000001128090, 0.000000842160, 0.000000629700];

var CIE1964StdObs_z10 = [
	0.000000535027, 0.000004028300, 0.000026143700, 0.000146220000, 0.000704776000, 0.002927800000,
	0.010482200000, 0.032344000000, 0.086010900000, 0.197120000000, 0.389366000000, 0.656760000000, 0.972542000000, 1.282500000000, 1.553480000000, 1.798500000000,
	1.967280000000, 2.027300000000, 1.994800000000, 1.900700000000, 1.745370000000, 1.554900000000, 1.317560000000, 1.030200000000, 0.772125000000, 0.570060000000,
	0.415254000000, 0.302356000000, 0.218502000000, 0.159249000000, 0.112044000000, 0.082248000000, 0.060709000000, 0.043050000000, 0.030451000000, 0.020584000000,
	0.013676000000, 0.007918000000, 0.003988000000, 0.001091000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000,
	0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000,
	0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000,
	0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000,
	0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000,
	0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000, 0.000000000000];

// Relative Spectral Power Distributions (SPD) S(λ) of 
// CIE Standard Illuminants A, C, D50, D55, D65, and D75 (CIE 15.3:2004, ASTM E308−18)
//
// 360nm to 780nm in 5nm increments
//
// Line  1: 360 - 385nm
// Line  2: 390 - 435nm
// Line  3: 440 - 485nm
// Line  4: 490 - 535nm
// Line  5: 540 - 585nm
// Line  6: 590 - 635nm
// Line  7: 640 - 685nm
// Line  8: 690 - 735nm
// Line  9: 740 - 785nm
// Line 10: 790 - 830nm
var SPD_CIE_Illuminant_A = [
	  6.1446,   6.9472,   7.8214,   8.7698,   9.7951,  10.8996,
	 12.0853,  13.3543,  14.7080,  16.1480,  17.6753,  19.2907,  20.9950,  22.7883,  24.6709,  26.6425,
	 28.7027,  30.8508,  33.0859,  35.4068,  37.8121,  40.3002,  42.8693,  45.5174,  48.2423,  51.0418,
	 53.9132,  56.8539,  59.8611,  62.9320,  66.0635,  69.2525,  72.4959,  75.7903,  79.1326,  82.5193,
	 85.9470,  89.4124,  92.9120,  96.4423, 100.0000, 103.5820, 107.1840, 110.8030, 114.4360, 118.0800,
	121.7310, 125.3860, 129.0430, 132.6970, 136.3460, 139.9880, 143.6180, 147.2350, 150.8360, 154.4180,
	157.9790, 161.5160, 165.0280, 168.5100, 171.9630, 175.3830, 178.7690, 182.1180, 185.4290, 188.7010,
	191.9310, 195.1180, 198.2610, 201.3590, 204.4090, 207.4110, 210.3650, 213.2680, 216.1200, 218.9200,
	221.6670, 224.3610, 227.0000, 229.5850, 232.1150, 234.5890, 237.0080, 239.3700, 241.6750, 243.9240,
	246.1160, 248.2510, 250.3290, 252.3500, 254.3140, 256.2210, 258.0710, 259.8650, 261.6020];

var SPD_CIE_Illuminant_C = [
	 12.9000,  17.2000,  21.4000,  27.5000,  33.0000,  39.9200,
	 47.4000,  55.1700,  63.3000,  71.8100,  80.6000,  89.5300,  98.1000, 105.8000, 112.4000, 117.7500,
	121.5000, 123.4500, 124.0000, 123.6000, 123.1000, 123.3000, 123.8000, 124.0900, 123.9000, 122.9200,
	120.7000, 116.9000, 112.1000, 106.9800, 102.3000,  98.8100,  96.9000,  96.7800,  98.0000,  99.9400,
	102.1000, 103.9500, 105.2000, 105.6700, 105.3000, 104.1100, 102.3000, 100.1500,  97.8000,  95.4300,
	 93.2000,  91.2200,  89.7000,  88.8300,  88.4000,  88.1900,  88.1000,  88.0600,  88.0000,  87.8600,
	 87.8000,  87.9900,  88.2000,  88.2000,  87.9000,  87.2200,  86.3000,  85.3000,  84.0000,  82.2100,
	 80.2000,  78.2400,  76.3000,  74.3600,  72.4000,  70.4000,  68.3000,  66.3000,  64.4000,  62.8000,
	 61.5000,  60.2000,  59.2000,  58.5000,  58.1000,  58.0000,  58.2000,  58.5000,  59.1000,  78.9100,
	 79.5500,  76.4800,  73.4000,  68.6600,  63.9200,  67.3500,  70.7800,  72.6100,  74.4400];

var SPD_CIE_Illuminant_D50 = [
	 23.9420,  25.4510,  26.9610,  25.7240,  24.4880,  27.1790,
	 29.8710,  39.5890,  49.3080,  52.9100,  56.5130,  58.2730,  60.0340,  58.9260,  57.8180,  66.3210,
	 74.8250,  81.0360,  87.2470,  88.9300,  90.6120,  90.9900,  91.3680,  93.2380,  95.1090,  93.5360,
	 91.9630,  93.8430,  95.7240,  96.1690,  96.6130,  96.8710,  97.1290,  99.6140, 102.0990, 101.4270,
	100.7550, 101.5360, 102.3170, 101.1590, 100.0000,  98.8680,  97.7350,  98.3270,  98.9180,  96.2080,
	 93.4990,  95.5930,  97.6880,  98.4780,  99.2690,  99.1550,  99.0420,  97.3820,  95.7220,  97.2900,
	 98.8570,  97.2620,  95.6670,  96.9290,  98.1900, 100.5970, 103.0030, 101.0680,  99.1330,  93.2570,
	 87.3810,  89.4920,  91.6040,  92.2460,  92.8890,  84.8720,  76.8540,  81.6830,  86.5110,  89.5460,
	 92.5800,  85.4050,  78.2300,  67.9610,  57.6920,  70.3070,  82.9230,  80.5990,  78.2740,  72.3800,
	 72.9400,  70.1400,  67.3500,  63.0400,  58.7300,  61.8600,  64.9900,  66.6500,  68.3100];

var SPD_CIE_Illuminant_D55 = [
	 30.6210,  32.4640,  34.3080,  33.4460,  32.5840,  35.3350,
	 38.0870,  49.5180,  60.9490,  64.7510,  68.5540,  70.0650,  71.5770,  69.7460,  67.9140,  76.7600,
	 85.6050,  91.7990,  97.9930,  99.2280, 100.4630, 100.1880,  99.9130, 101.3260, 102.7390, 100.4090,
	 98.0780,  99.3790, 100.6800, 100.6880, 100.6950, 100.3410,  99.9870, 102.0980, 104.2100, 103.1560,
	102.1020, 102.5350, 102.9680, 101.4840, 100.0000,  98.6080,  97.2160,  97.4820,  97.7490,  94.5900,
	 91.4320,  92.9260,  94.4190,  94.7800,  95.1400,  94.6800,  94.2200,  92.3340,  90.4480,  91.3890,
	 92.3300,  90.5920,  88.8540,  89.5860,  90.3170,  92.1330,  93.9500,  91.9530,  89.9560,  84.8170,
	 79.6770,  81.2580,  82.8400,  83.8420,  84.8440,  77.5390,  70.2350,  74.7680,  79.3010,  82.1470,
	 84.9930,  78.4370,  71.8800,  62.3370,  52.7930,  64.3600,  75.9270,  73.8720,  71.8180,  63.8400,
	 64.3000,  61.8800,  59.4500,  55.7100,  51.9600,  54.7000,  57.4400,  58.8800,  60.3100];

var SPD_CIE_Illuminant_D65 = [
	 46.6383,  49.3637,  52.0891,  51.0323,  49.9755,  52.3118,
	 54.6482,  68.7015,  82.7549,  87.1204,  91.4860,  92.4589,  93.4318,  90.0570,  86.6823,  95.7736,
	104.8650, 110.9360, 117.0080, 117.4100, 117.8120, 116.3360, 114.8610, 115.3920, 115.9230, 112.3670,
	108.8110, 109.0820, 109.3540, 108.5780, 107.8020, 106.2960, 104.7900, 106.2390, 107.6890, 106.0470,
	104.4050, 104.2250, 104.0460, 102.0230, 100.0000,  98.1671,  96.3342,  96.0611,  95.7880,  92.2368,
	 88.6856,  89.3459,  90.0062,  89.8026,  89.5991,  88.6489,  87.6987,  85.4936,  83.2886,  83.4939,
	 83.6992,  81.8630,  80.0268,  80.1207,  80.2146,  81.2462,  82.2778,  80.2810,  78.2842,  74.0027,
	 69.7213,  70.6652,  71.6091,  72.9790,  74.3490,  67.9765,  61.6040,  65.7448,  69.8856,  72.4863,
	 75.0870,  69.3398,  63.5927,  55.0054,  46.4182,  56.6118,  66.8054,  65.0941,  63.3828,  63.8434,
	 64.3040,  61.8779,  59.4519,  55.7054,  51.9590,  54.6998,  57.4406,  58.8765,  60.3125];

var SPD_CIE_Illuminant_D75 = [
	 62.9820,  66.6470,  70.3120,  68.5070,  66.7030,  68.3330,
	 69.9630,  85.9460, 101.9290, 106.9110, 111.8940, 112.3460, 112.7980, 107.9450, 103.0920, 112.1450,
	121.1980, 127.1040, 133.0100, 132.6820, 132.3550, 129.8380, 127.3220, 127.0610, 126.8000, 122.2910,
	117.7830, 117.1860, 116.5890, 115.1460, 113.7020, 111.1810, 108.6590, 109.5520, 110.4450, 108.3670,
	106.2890, 105.5960, 104.9040, 102.4520, 100.0000,  97.8080,  95.6160,  94.9140,  94.2130,  90.6050,
	 86.9970,  87.1120,  87.2270,  86.6840,  86.1400,  84.8610,  83.5810,  81.1640,  78.7470,  78.5870,
	 78.4280,  76.6140,  74.8010,  74.5620,  74.3240,  74.8730,  75.4220,  73.4990,  71.5760,  67.7140,
	 63.8520,  64.4640,  65.0760,  66.5730,  68.0700,  62.2560,  56.4430,  60.3430,  64.2420,  66.6970,
	 69.1510,  63.8900,  58.6290,  50.6230,  42.6170,  51.9850,  61.3520,  59.8380,  58.3240];

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
		case 0:
			window[White].Name = "A/2°";
			window[White].Standard = "ASTM E308-18";
			window[White].Note = "Incandescent (Tungsten)";
			window[White].CCT = "2856";
			window[White].X = 1.09850;
			window[White].Z = 0.35585;
			window[White].x = 0.44757;
			window[White].y = 0.40744;
			break;
		case 1:
			window[White].Name = "B/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Direct sunlight at noon (obsolete)";
			window[White].CCT = "4874";
			window[White].X = 0.99093;
			window[White].Z = 0.85313;
			window[White].x = 0.34842;
			window[White].y = 0.35161;
			break;
		case 2:
			window[White].Name = "C/2°";
			window[White].Standard = "ASTM E308-18";
			window[White].Note = "North sky daylight (average) (obsolete)";
			window[White].CCT = "6774";
			window[White].X = 0.98074;
			window[White].Z = 1.18232;
			window[White].x = 0.31006;
			window[White].y = 0.31616;
			break;
		case 3:
			window[White].Name = "D50/2°";
			window[White].Standard = "ASTM E308-18";
			window[White].Note = "Horizon light / ICC profile PCS";
			window[White].CCT = "5003";
			window[White].X = 0.96422;
			window[White].Z = 0.82521;
			window[White].x = 0.34567;
			window[White].y = 0.35850;
			break;
		case 4:
			window[White].Name = "D55/2°";
			window[White].Standard = "ASTM E308-18";
			window[White].Note = "Mid-morning / Mid-afternoon daylight";
			window[White].CCT = "5503";
			window[White].X = 0.95682;
			window[White].Z = 0.92149;
			window[White].x = 0.33242;
			window[White].y = 0.34743;
			break;
		case 5:
			window[White].Name = "D65/2°";
			window[White].Standard = "ASTM E308-18";
			window[White].Note = "Noon daylight / Television, sRGB color space";
			window[White].CCT = "6504";
			window[White].X = 0.95047;
			window[White].Z = 1.08883;
			window[White].x = 0.31273;
			window[White].y = 0.32902;
			break;
		case 6:
			window[White].Name = "D75/2°";
			window[White].Standard = "ASTM E308-18";
			window[White].Note = "North sky daylight";
			window[White].CCT = "7504";
			window[White].X = 0.94972;
			window[White].Z = 1.22638;
			window[White].x = 0.29902;
			window[White].y = 0.31485;
			break;
		case 7:
			window[White].Name = "E/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Equal energy";
			window[White].CCT = "5454";
			window[White].X = 1.00000;
			window[White].Z = 1.00000;
			window[White].x = 0.33333;
			window[White].y = 0.33333;
			break;
		case 8:
			window[White].Name = "F1/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Daylight (fluorescent)";
			window[White].CCT = "6430";
			window[White].X = 0.92834;
			window[White].Z = 1.03665;
			window[White].x = 0.31310;
			window[White].y = 0.33727;
			break;
		case 9:
			window[White].Name = "F2/2°";
			window[White].Standard = "ASTM E308-18";
			window[White].Note = "Cool white (fluorescent)";
			window[White].CCT = "4230";
			window[White].X = 0.99186;
			window[White].Z = 0.67393;
			window[White].x = 0.37207;
			window[White].y = 0.37512;
			break;
		case 10:
			window[White].Name = "F3/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "White (fluorescent)";
			window[White].CCT = "3450";
			window[White].X = 1.03754;
			window[White].Z = 0.49861;
			window[White].x = 0.40910;
			window[White].y = 0.39430;
			break;
		case 11:
			window[White].Name = "F4/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Warm white (fluorescent)";
			window[White].CCT = "2940";
			window[White].X = 1.09147;
			window[White].Z = 0.38813;
			window[White].x = 0.44018;
			window[White].y = 0.40329;
			break;
		case 12:
			window[White].Name = "F5/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Daylight (fluorescent)";
			window[White].CCT = "6350";
			window[White].X = 0.90872;
			window[White].Z = 0.98723;
			window[White].x = 0.31379;
			window[White].y = 0.34531;
			break;
		case 13:
			window[White].Name = "F6/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Light white (fluorescent)";
			window[White].CCT = "4150";
			window[White].X = 0.97309;
			window[White].Z = 0.60191;
			window[White].x = 0.37790;
			window[White].y = 0.38835;
			break;
		case 14:
			window[White].Name = "F7/2°";
			window[White].Standard = "ASTM E308-18";
			window[White].Note = "Daylight / D65 (Simulator)";
			window[White].CCT = "6500";
			window[White].X = 0.95041;
			window[White].Z = 1.08747;
			window[White].x = 0.31285;
			window[White].y = 0.32918;
			break;
		case 15:
			window[White].Name = "F8/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "D50 (Simulator) / Sylvania F40 Design 50";
			window[White].CCT = "5000";
			window[White].X = 0.96413;
			window[White].Z = 0.82333;
			window[White].x = 0.34588;
			window[White].y = 0.35875;
			break;
		case 16:
			window[White].Name = "F9/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Cool white deluxe (fluorescent)";
			window[White].CCT = "4150";
			window[White].X = 1.00365;
			window[White].Z = 0.67868;
			window[White].x = 0.37417;
			window[White].y = 0.37281;
			break;
		case 17:
			window[White].Name = "F10/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Philips TL85 / Ultralume 50";
			window[White].CCT = "5000";
			window[White].X = 0.96174;
			window[White].Z = 0.81712;
			window[White].x = 0.34609;
			window[White].y = 0.35986;
			break;
		case 18:
			window[White].Name = "F11/2°";
			window[White].Standard = "ASTM E308-18";
			window[White].Note = "Philips TL84 / Ultralume 40";
			window[White].CCT = "4000";
			window[White].X = 1.00962;
			window[White].Z = 0.64350;
			window[White].x = 0.38054;
			window[White].y = 0.37692;
			break;
		case 19:
			window[White].Name = "F12/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Philips TL83 / Ultralume 30";
			window[White].CCT = "3000";
			window[White].X = 1.08046;
			window[White].Z = 0.39228;
			window[White].x = 0.43695;
			window[White].y = 0.40441;
			break;
		case 20:
			window[White].Name = "LED-B1/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Phosphor-converted blue";
			window[White].CCT = "2733";
			window[White].X = 1.118195;
			window[White].Z = 0.333987;
			window[White].x = 0.4560;
			window[White].y = 0.4078;
			break;
		case 21:
			window[White].Name = "LED-B2/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Phosphor-converted blue";
			window[White].CCT = "2998";
			window[White].X = 1.085992;
			window[White].Z = 0.406530;
			window[White].x = 0.4357;
			window[White].y = 0.4012;
			break;
		case 22:
			window[White].Name = "LED-B3/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Phosphor-converted blue";
			window[White].CCT = "4103";
			window[White].X = 1.008864;
			window[White].Z = 0.677142;
			window[White].x = 0.3756;
			window[White].y = 0.3723;
			break;
		case 23:
			window[White].Name = "LED-B4/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Phosphor-converted blue";
			window[White].CCT = "5109";
			window[White].X = 0.977156;
			window[White].Z = 0.878355;
			window[White].x = 0.3422;
			window[White].y = 0.3502;
			break;
		case 24:
			window[White].Name = "LED-B5/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Phosphor-converted blue";
			window[White].CCT = "6598";
			window[White].X = 0.963535;
			window[White].Z = 1.126700;
			window[White].x = 0.3118;
			window[White].y = 0.3236;
			break;
		case 25:
			window[White].Name = "LED-BH1/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Mixing of phosphor-converted blue LED and red LED (blue-hybrid)";
			window[White].CCT = "2851";
			window[White].X = 1.100344;
			window[White].Z = 0.359075;
			window[White].x = 0.4474;
			window[White].y = 0.4066;
			break;
		case 26:
			window[White].Name = "LED-RGB1/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Mixing of red, green, and blue LEDs";
			window[White].CCT = "2840";
			window[White].X = 1.082166;
			window[White].Z = 0.292567;
			window[White].x = 0.4557;
			window[White].y = 0.4211;
			break;
		case 27:
			window[White].Name = "LED-V1/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Phosphor-converted violet";
			window[White].CCT = "3079";
			window[White].X = 1.002639;
			window[White].Z = 0.196130;
			window[White].x = 0.4560;
			window[White].y = 0.4548;
			break;
		case 28:
			window[White].Name = "LED-V2/2°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Phosphor-converted violet";
			window[White].CCT = "4070";
			window[White].X = 1.001589;
			window[White].Z = 0.647417;
			window[White].x = 0.3781;
			window[White].y = 0.3775;
			break;

		case 30:
			window[White].Name = "A/10°";
			window[White].Standard = "ASTM E308-18";
			window[White].Note = "Incandescent (Tungsten)";
			window[White].CCT = "2789";
			window[White].X = 1.11144;
			window[White].Z = 0.35200;
			window[White].x = 0.45117;
			window[White].y = 0.40594;
			break;
		case 31:
			window[White].Name = "B/10°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Direct sunlight at noon (obsolete)";
			window[White].CCT = "4826";
			window[White].X = 0.991778;
			window[White].Z = 0.843493;
			window[White].x = 0.34980;
			window[White].y = 0.35270;
			break;
		case 32:
			window[White].Name = "C/10°";
			window[White].Standard = "ASTM E308-18";
			window[White].Note = "North sky daylight (average) (obsolete)";
			window[White].CCT = "6724";
			window[White].X = 0.97285;
			window[White].Z = 1.16145;
			window[White].x = 0.31039;
			window[White].y = 0.31905;
			break;
		case 33:
			window[White].Name = "D50/10°";
			window[White].Standard = "ASTM E308-18";
			window[White].Note = "Horizon light / ICC profile PCS";
			window[White].CCT = "4929";
			window[White].X = 0.96720;
			window[White].Z = 0.81427;
			window[White].x = 0.34773;
			window[White].y = 0.35952;
			break;
		case 34:
			window[White].Name = "D55/10°";
			window[White].Standard = "ASTM E308-18";
			window[White].Note = "Mid-morning / Mid-afternoon daylight";
			window[White].CCT = "5431";
			window[White].X = 0.95799;
			window[White].Z = 0.90926;
			window[White].x = 0.33411;
			window[White].y = 0.34877;
			break;
		case 35:
			window[White].Name = "D65/10°";
			window[White].Standard = "ASTM E308-18";
			window[White].Note = "Noon daylight / Television, sRGB color space";
			window[White].CCT = "6429";
			window[White].X = 0.94811;
			window[White].Z = 1.07304;
			window[White].x = 0.31382;
			window[White].y = 0.33100;
			break;
		case 36:
			window[White].Name = "D75/10°";
			window[White].Standard = "ASTM E308-18";
			window[White].Note = "North sky daylight";
			window[White].CCT = "7418";
			window[White].X = 0.94416;
			window[White].Z = 1.20641;
			window[White].x = 0.29968;
			window[White].y = 0.31740;
			break;
		case 37:
			window[White].Name = "E/10°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Equal energy";
			window[White].CCT = "5454";
			window[White].X = 1.00000;
			window[White].Z = 1.00000;
			window[White].x = 0.33333;
			window[White].y = 0.33333;
			break;
		case 38:
			window[White].Name = "F1/10°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Daylight (fluorescent)";
			window[White].CCT = "6182";
			window[White].X = 0.94791;
			window[White].Z = 1.03191;
			window[White].x = 0.31811;
			window[White].y = 0.33559;
			break;
		case 39:
			window[White].Name = "F2/10°";
			window[White].Standard = "ASTM E308-18";
			window[White].Note = "Cool white (fluorescent)";
			window[White].CCT = "3959";
			window[White].X = 1.03279;
			window[White].Z = 0.69027;
			window[White].x = 0.37928;
			window[White].y = 0.36723;
			break;
		case 40:
			window[White].Name = "F3/10°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "White (fluorescent)";
			window[White].CCT = "3177";
			window[White].X = 1.08968;
			window[White].Z = 0.51965;
			window[White].x = 0.41761;
			window[White].y = 0.38324;
			break;
		case 41:
			window[White].Name = "F4/10°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Warm white (fluorescent)";
			window[White].CCT = "2694";
			window[White].X = 1.14961;
			window[White].Z = 0.40963;
			window[White].x = 0.44920;
			window[White].y = 0.39074;
			break;
		case 42:
			window[White].Name = "F5/10°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Daylight (fluorescent)";
			window[White].CCT = "6074";
			window[White].X = 0.93369;
			window[White].Z = 0.98636;
			window[White].x = 0.31975;
			window[White].y = 0.34246;
			break;
		case 43:
			window[White].Name = "F6/10°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Light white (fluorescent)";
			window[White].CCT = "3848";
			window[White].X = 1.02148;
			window[White].Z = 0.62074;
			window[White].x = 0.38660;
			window[White].y = 0.37847;
			break;
		case 44:
			window[White].Name = "F7/10°";
			window[White].Standard = "ASTM E308-18";
			window[White].Note = "Daylight / D65 (Simulator)";
			window[White].CCT = "6342";
			window[White].X = 0.95792;
			window[White].Z = 1.07686;
			window[White].x = 0.31565;
			window[White].y = 0.32951;
			break;
		case 45:
			window[White].Name = "F8/10°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "D50 (Simulator) / Sylvania F40 Design 50";
			window[White].CCT = "4883";
			window[White].X = 0.97115;
			window[White].Z = 0.81135;
			window[White].x = 0.34902;
			window[White].y = 0.35939;
			break;
		case 46:
			window[White].Name = "F9/10°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Cool white deluxe (fluorescent)";
			window[White].CCT = "4013";
			window[White].X = 1.02116;
			window[White].Z = 0.67826;
			window[White].x = 0.37829;
			window[White].y = 0.37045;
			break;
		case 47:
			window[White].Name = "F10/10°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Philips TL85 / Ultralume 50";
			window[White].CCT = "4794";
			window[White].X = 0.99001;
			window[White].Z = 0.83134;
			window[White].x = 0.35090;
			window[White].y = 0.35444;
			break;
		case 48:
			window[White].Name = "F11/10°";
			window[White].Standard = "ASTM E308-18";
			window[White].Note = "Philips TL84 / Ultralume 40";
			window[White].CCT = "3820";
			window[White].X = 1.03863;
			window[White].Z = 0.65607;
			window[White].x = 0.38543;
			window[White].y = 0.37110;
			break;
		case 49:
			window[White].Name = "F12/10°";
			window[White].Standard = "https://en.wikipedia.org/wiki/Standard_illuminant";
			window[White].Note = "Philips TL83 / Ultralume 30";
			window[White].CCT = "2851";
			window[White].X = 1.11428;
			window[White].Z = 0.40353;
			window[White].x = 0.44256;
			window[White].y = 0.39717;
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
			break;
	}
}

function ChromaticAdaptationXYZ(XYZ)
{
	let res = {
		Source: SourceWhite.Name,
		Reference: RefWhite.Name,
		Adaptation: AdaptationMethod,
		X: XYZ.X,
		Y: XYZ.Y,
		Z: XYZ.Z
	}

	if (SelectedAdaptationMethod != 3)
	{
		var As = SourceWhite.X * MtxAdaptMa.m00 + SourceWhite.Y * MtxAdaptMa.m10 + SourceWhite.Z * MtxAdaptMa.m20;
		var Bs = SourceWhite.X * MtxAdaptMa.m01 + SourceWhite.Y * MtxAdaptMa.m11 + SourceWhite.Z * MtxAdaptMa.m21;
		var Cs = SourceWhite.X * MtxAdaptMa.m02 + SourceWhite.Y * MtxAdaptMa.m12 + SourceWhite.Z * MtxAdaptMa.m22;

		var Ad = RefWhite.X * MtxAdaptMa.m00 + RefWhite.Y * MtxAdaptMa.m10 + RefWhite.Z * MtxAdaptMa.m20;
		var Bd = RefWhite.X * MtxAdaptMa.m01 + RefWhite.Y * MtxAdaptMa.m11 + RefWhite.Z * MtxAdaptMa.m21;
		var Cd = RefWhite.X * MtxAdaptMa.m02 + RefWhite.Y * MtxAdaptMa.m12 + RefWhite.Z * MtxAdaptMa.m22;

		var X1 = XYZ.X * MtxAdaptMa.m00 + XYZ.Y * MtxAdaptMa.m10 + XYZ.Z * MtxAdaptMa.m20;
		var Y1 = XYZ.X * MtxAdaptMa.m01 + XYZ.Y * MtxAdaptMa.m11 + XYZ.Z * MtxAdaptMa.m21;
		var Z1 = XYZ.X * MtxAdaptMa.m02 + XYZ.Y * MtxAdaptMa.m12 + XYZ.Z * MtxAdaptMa.m22;

		X1 *= (Ad / As);
		Y1 *= (Bd / Bs);
		Z1 *= (Cd / Cs);

		res.X = X1 * MtxAdaptMaI.m00 + Y1 * MtxAdaptMaI.m10 + Z1 * MtxAdaptMaI.m20;
		res.Y = X1 * MtxAdaptMaI.m01 + Y1 * MtxAdaptMaI.m11 + Z1 * MtxAdaptMaI.m21;
		res.Z = X1 * MtxAdaptMaI.m02 + Y1 * MtxAdaptMaI.m12 + Z1 * MtxAdaptMaI.m22;
	}
	return(res);
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
	RGB.Adaptation = AdaptationMethod;
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
	xyY.Adaptation = AdaptationMethod;
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
	Lab.Adaptation = AdaptationMethod;
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
	Luv.Adaptation = AdaptationMethod;
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
	HunterLab.Adaptation = AdaptationMethod;
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
