// Standards / References:
//
// +++ EN 1557			: Colorimetric characterization of optically clear colored liquids
// DIN 5036			: Assessment and Measurement of Luminous Characteristics of Materials
// DIN 1349-1		: Transmission of optical radiation; optical clear (nonscattering) media
// +++ DIN 6162			: Determination of iodine color number
// ISO 2049
// --- ISO 4630			: Estimation of color of clear liquids by the Gardner color scale
// ISO 6271			: Clear liquids; Estimation of color by the platinum-cobalt-scale (Hazen, APHA color number)
// ISO 11664		: Colorimetry (also ASTM E308) (replacement for DIN 5033)
// +++ ISO/CIE 11664-1:2019 Colorimetry — Part 1: CIE standard colorimetric observers
// ISO/CIE 11664-2:2020 Colorimetry — Part 2: CIE standard illuminants
// +++ ISO/CIE 11664-3:2019 Colorimetry — Part 3: CIE tristimulus values
// ISO/CIE 11664-4:2019 Colorimetry — Part 4: CIE 1976 L*a*b* colour space
// ISO/CIE 11664-5:2016 Colorimetry — Part 5: CIE 1976 L*u*v* colour space and u', v' uniform chromaticity scale diagram
// ISO/CIE 11664-6:2014 Colorimetry — Part 6: CIEDE2000 Colour-difference formula

// Hess-Ives		: Bestimmung der Farbzahl nach Hess-Ives; DGK-Prüfmethode F 050.1
// Ph. Eur			: European Pharmacopoeia, chapter 2.2.2 Coloration of Liquids
// +++ ASTM D156		: Standard Test Method for Saybolt Color of Petroleum Products
// +++ ASTM D268		: Standard Guide for Sampling and Testing Volatile Solvents and Chemical Intermediates for Use in Paint and Related Coatings and Material
// --- ASTM D848		: Standard Test Method for Acid Wash Color of Industrial Aromatic Hydrocarbons
// +++ ASTM D1045-95	: Standard Test Methods for Sampling and Testing Plasticizers Used in Plastics
// +++ ASTM D1209-62	: Standard Test Method for Color of Clear Liquids (Platinum-Cobalt Scale)
// +++ ASTM D1500		: Standard Test Method for ASTM Color of Petroleum Products (ASTM Color Scale), also DIN/ISO 2049
// +++ ASTM D1544-98	: Standard Test Method for Color of Transparent Liquids (Gardner Color Scale)
// +++ ASTM D5386		: Standard Test Method for Color of Liquids Using Tristimulus Colorimetry.
// +++ ASTM D6045		: Standard Test Method for Color of Petroleum Products by the Automatic Tristimulus Method
// +++ ASTM D6166		: Standard Test Method for Color of Naval Stores and Related Products (Instrumental Determination of Gardner Color)
// +++ ASTM E308		: Standard Practice for Computing the Colors of Objects by Using the CIE System
// +++ ASTM E313-05		: Standard Practice for Calculating Yellowness and Whiteness Indices from Instrumentally Measured Color Coordinates
// AOCS Cc 13a		: FAC Standard Color.
// AOCS Cc 13e		: Fats and fatty oils, Determination of color, also BS 684 1.14
// ISO 27608		: Animal and vegetable fats and oils - Determination of Lovibond color - Automatic method
// Möller-Kemsa J.	: Objective Color Assessment at Cosmetic Products, Euro Cosmetics 4/94
//
// d				Thickness of the solution layer (Optical Path Length of cuvette) [cm]
// NULL-Reference	Distilled water

function GetColorScale(SelectedColorScale, SensorLab)
{
	switch (SelectedColorScale)
	{
		case 0:
			ColorScale = {
				Name: 'None'
			};
			break;
		case 1:
			// T = IT / I0
			// Eλ = - log ( T ) = log ( 1 / T )
			// SACλ = Eλ / d * 100
			//
			// λ				Wavelength [nm]
			// I0				Intensity of incident light [lux]
			// IT				Intensity of transmitted light [lux]
			// T				Transmission (Range: 0.0 - 1.0)
			// Eλ				Absorbance (Optimum range: 0.1 – 1.0)
			// d				Thickness of the solution layer (Optical Path Length of cuvette) [cm]
			// SACλ				Spectral Absorption Coefficient [m-1]
			//
			// TCS34725			Red channel		=> 615 nm (+/- 15 nm)
			//					Green channel	=> 525 nm (+/- 35 nm)
			//					Blue channel	=> 465 nm (+/- 22 nm)
			//

//			var DX = -1 * Math.log10(SensorXYZ.X / 0.98072);
//			var DY = -1 * Math.log10(SensorXYZ.Y / 1.00000);
//			var DZ = -1 * Math.log10(SensorXYZ.Z / 1.18225);

//			var SAC = (0.25 + 0.8695 * ( DX + DY + DZ )).toFixed(1);

			ColorScale = {
				Name: 'Spectral Absorption Coefficient (SAC)',
				Standard: '',
				Range: '0-100',
				Unit: 'm-1',
				Decription: 'SAC436 describes the yellow colouring of potable-, used- or wastewater. The measuring range is indicated in m-1 (Extinction per meter optical path lenght [Ext/m])',
				DeterminationMethod: 'Calculated from Absorbance (Eλ)',
				ReferenceOpticalPathLength: 1,
				ReferenceNull: 'Distilled water',
				ColorSpace: 'n/a',
				ColorReference: 'n/a',
				Value: SAC,
				Index: {
					['ASTMColor-'+ASTM]: 'L: SensorLab.L, a: SensorLab.a, b: SensorLab.b' 
				}
			};
			break;

		case 2:
			// EBC = 25 * E430 * d * x dilution factor
			// EBC = (E430 x 25) – (E700 x 25)
			//
			// d = 1			Thickness of the solution layer (Optical Path Length of cuvette) [cm]
			//
			// TCS34725			Red channel		=> 615 nm (+/- 15 nm)
			//					Green channel	=> 525 nm (+/- 35 nm)
			//					Blue channel	=> 465 nm (+/- 22 nm)
			//
			// The sample will be diluted until the absorption is less than 2 Extinction units (E430)
			// The additional absorption caused by particles will be subtracted to compensate the turbidity effect.
			//
			// Based either on absorption at 430 nm or CIE x y chromaticity co-ordinates
			//
			// https://en.wikipedia.org/wiki/Standard_Reference_Method
			//
			ColorScale = {
				Name: 'EBC Color',
				Standard: 'EBC MEBAK 2.16.2',
				Range: '0–80',
				Unit: 'EBC units',
				Decription: 'European standard for beers, malts and caramels and similarly colored liquids',
				DeterminationMethod: 'Calculated from Absorbance (Eλ=430)',
				ReferenceOpticalPathLength: 1,
				ReferenceNull: 'Distilled water',
				ColorSpace: 'n/a',
				ColorReference: 'n/a',
				Index: {
				}
			};
			break;
		case 3:
			// ASBC = 0.375 * EBC + 0.46
			// SRM = EBC / 3.94
			//
			// EBC				EBC Color
			// SRM				Standard Reference Method
			//
			ColorScale = {
				Name: 'ASBC Color',
				Standard: 'ASBC Beer-10A',
				Range: '0–30',
				Unit: 'ASBC units',
				Decription: 'American standard for color grading of beers',
				DeterminationMethod: 'Calculated from EBC Color => Absorbance (Eλ=430)',
				ReferenceOpticalPathLength: 1,
				ReferenceNull: 'Distilled water',
				ColorSpace: 'n/a',
				ColorReference: 'n/a',
				Index: {
				}
			};
			break;
		case 4:
			// ICUMSA = 1000 * (E420,50Brix) / c * d
			//
			// d = 1			Thickness of the solution layer (Optical Path Length of cuvette) [cm]
			// c				Concentration of suguar in the liquid [g/ml]
			//
			// TCS34725			Red channel		=> 615 nm (+/- 15 nm)
			//					Green channel	=> 525 nm (+/- 35 nm)
			//					Blue channel	=> 465 nm (+/- 22 nm)
			//
			ColorScale = {
				Name: 'ICUMSA Suguar Color',
				Standard: 'ICUMSA GS1/3-7, GS2/3-9 and GS2/3-10',
				Range: '0-2800',
				Unit: 'ICUMSA units',
				Decription: 'For sugar solutions & syrups',
				DeterminationMethod: 'Calculated from Absorbance (Eλ=420)',
				ReferenceOpticalPathLength: 1,
				ReferenceNull: 'Distilled water',
				ColorSpace: 'n/a',
				ColorReference: 'n/a',
				Index: {
				}
			};
			break;
		case 5:
			// H-I = (R + G + B) * 6 / (10 * d) => Original d in [mm]
			//
			// R = 43,45 * E640
			// G = 162,38 * E560
			// B = 22,89 * ( E460 + E470 ) / 2
			//
			// R, G and B are the color components for the 
			// red (640 nm),
			// green (560nm) and
			// blue (464nm) shares
			//
			// d = 1			Thickness of the solution layer (Optical Path Length of cuvette) [cm]
			//
			// TCS34725			Red channel		=> 615 nm (+/- 15 nm)
			//					Green channel	=> 525 nm (+/- 35 nm)
			//					Blue channel	=> 465 nm (+/- 22 nm)
			//
			ColorScale = {
				Name: 'Hess-Ives Color',
				Standard: 'DGK F050.2',
				Range: '',
				Unit: 'H-I units',
				Decription: 'For cosmetic industry, color evaluation of fat derivatives and surfactant liquids',
				DeterminationMethod: 'Calculated from Absorbance (Eλ=640,560,464)',
				ReferenceOpticalPathLength: 1,
				ReferenceNull: 'Distilled water',
				ColorSpace: 'n/a',
				ColorReference: 'n/a',
				Index: {
				}
			};
			break;
		case 10:
			// EN 1557 (1997) (CIE C/2o, d=1cm)
			//-----------------------------------------------------------------------------------------
			//
			// The measured signal TNd (in %) indicates transmittances for TX, TY or TZ:
			//
			// TN = 100 * ( TNd / 100 )^(1/d)
			// TN ( N = X, Y, Z) (in %) measured with a d=1cm path cuvette
			//
			// d = 1			Thickness of the solution layer (Optical Path Length of cuvette) [cm]
			//
			// TCS34725			X/Red channel	=> 615 nm (+/- 15 nm)
			//					Y/Green channel	=> 525 nm (+/- 35 nm)
			//					Z/Blue channel	=> 465 nm (+/- 22 nm)
			//
			// X = a * TX + b * TZ
			// Y = TY
			// Z = c * TZ
			//
			// X = a * 100 * ( TX / 100 )^(1/d) + b * 100 * ( TZ / 100 )^(1/d)
			// Y = 100 * ( TY / 100 )^(1/d)
			// Z^d = c^d * 100 * ( TZ / 100 )
			//
			// a = 0.7832 (Reference: C/2° SIST EN 1557:1997)
			// b = 0.1975
			// c = 1.1822
			//
			// Xr + Xg + Xb = Xw
			// Yr + Yg + Yb = Yw = 1
			// Zr + Zg + Zb = Xw
			//
			// X = RXr + GXg + BXb
			// Y = RYr + GYg + BYb
			// Z = RZr + GZg + BZb
			// https://www.sciencedirect.com/topics/computer-science/tristimulus-value
			//
			// e) Tristimulus weighting factors (“white point” values) (E308)
			//
			// X = XN * (FA * TX + FB * TY) (ASTM E313 – 15)
			// XN = 98.074 (CIE C2)
			// YN = 100.000
			// ZN = 118.232
			// FA = 0.7987
			// FB = 0.2013
			// CX = 1.2769
			// CZ = 1.0592
			//
			ColorScale = {
				Name: 'CIE-XYZ coordinates',
				Standard: 'EN 1557',
				Range: '',
				Unit: '',
				Decription: 'XYZ by tristimulus method',
				DeterminationMethod: 'Calculated from Transmittances (TX, TY, TZ)',
				ReferenceOpticalPathLength: 1,
				ReferenceNull: 'Distilled water',
				ColorSpace: 'CIE-XYZ',
				ColorReference: 'C/2°',
				Index: {
				}
			};
			break;
		case 11:
			// a) YI = 100 * ( TX - TZ ) / TY (Hunter)
			//
			// TX: amber or red colorimeter reading
			// TY: blue colorimeter reading
			// TZ: green colorimeter reading
			//
			// b) YI = 100 * (T680 − T420) / T560
			//
			// TCS34725			Red channel		=> 615 nm (+/- 15 nm)
			//					Green channel	=> 525 nm (+/- 35 nm)
			//					Blue channel	=> 465 nm (+/- 22 nm)
			//
			// d) YI = 100(1 − B / G) (ASTM E313 - not recommended)
			//
			// ASTM D1925 yellowness index is calculated by (deprecated):
			//-----------------------------------------------------------
			//
			// YI = 100 * (1.274641506 * X - 1.057434092 * Z) / Y
			//
			// ASTM E313-15 yellowness index is calculated by:
			//------------------------------------------------------
			//
			// YI = (100 * (CX * X - CZ * Z)) / Y
			//
			// C/2		:	CX	1.2769, CZ	1.0592
			// D65/2	:	CX	1.2985, CZ	1.1335
			// C/10		:	CX	1.2871, CZ	1.0781
			// D65/10	:	CX	1.3013, CZ	1.1498
			//
			// d = 1 ?????		Thickness of the solution layer (Optical Path Length of cuvette) [cm]
			// NULL-Reference	Distilled water ???????????????????????????????
			//
			// (ASTM D5386-93b, ASTM E313-05)
			//

			var CX = 1.2769;
			var CZ = 1.0592;
			var YI = ((100 * (CX * SensorXYZ.X - CZ * SensorXYZ.Z)) / SensorXYZ.Y).toFixed(0);

			ColorScale = {
				Name: 'Yellowness Index',
				Standard: 'ASTM E313-15',
				Range: '0-850',
				Unit: 'YI units',
				Decription: 'For the determination of the degree of yellowness of transparent liquids',
				DeterminationMethod: 'Calculated from CIE-XYZ coordinates',
				ReferenceOpticalPathLength: 1,
				ReferenceNull: 'Distilled water',
				ColorSpace: 'CIE-XYZ',
				ColorReference: 'C/2°',
				ChartBackground: 'CIE-Lab-L75-Yellowness-Color.png',
				ChartCurveType: 'none',
				ChartLineWidth: 0,
				Value: YI,
				Index: {
					['YellownessIndex-'+YI]: 'L: SensorLab.L, a: SensorLab.a, b: SensorLab.b' 
				}
			};
			break;
		case 12:
			//
			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			//
			// Absorbance Tolerance Limits for No. 500 PlatinumCobalt Stock Solution (ASTM D5386–04, CIE C/2o, d=1cm)
			// E430 = 0.110 to 0.120
			// E455 = 0.130 to 0.145
			// E480 = 0.105 to 0.120
			// E510 = 0.055 to 0.065
			//
			// E430 = 0.115
			// E455 = 0.135
			// E480 = 0.115
			// E510 = 0.06
			//
			// Optical path length: 10 mm
			//
			// d = 1			Thickness of the solution layer (Optical Path Length of cuvette) [cm]
			//
			// Photometrisch wird die Platin-Kobalt Farbzahl nach ASTM D5386-05 aus dem Yellowness-Index nach
			// ASTM E313-05 berechnet.
			// Die NULL-Referenz ist dest. Wasser.
			//
			// ASTM D1209 Standard Test Method for Color of Clear Liquids (Platinum Cobalt Scale)
			// defines the visual APHA/Pt-Co/Hazen color scale for yellowness of clear liquids.
			//
			// Calibration standard with 500 mg/l Pt/Co 500 (500 Hazen)
			//
			// ASTM D5386 Standard Test Method for Color of Liquids Using Tristimulus Colorimetry
			// defines the instrumental method of APHA/Pt-Co/Hazen color measurement for yellowness
			// of clear liquids correlated to the visual ASTM D1209 method.
			//
			ColorScale = {
				Name: 'Platinum-Cobalt/Hazen/APHA Color',
				Standard: 'ASTM D1209, ASTM D5386',
				Range: '0-500',
				Unit: 'Pt-Co units',
				Decription: 'For water and other clear liquids such as plasticizers, solvents and petroleum spirits, clear oils, chemicals and petrochemicals such as glycerine, solvents, carbon tetrachloride, and petroleum spirits',
				DeterminationMethod: 'mg/l Pt/Co',
				ReferenceOpticalPathLength: 1,
				ReferenceNull: 'Distilled water',
				ColorSpace: 'CIE-L*a*b*',
				ColorReference: 'C/2°',
				ChartBackground: 'CIE-Lab-L100.png',
				ChartCurveType: 'function',
				ChartLineWidth: 2,
				Index: {
				}
			};
			break;
		case 13:
			//
			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			//
			//
			// ADMI = 7.7744 x^3 - 12.065 x^2 + 181.3 x - 1.3892
			//
			// X = DE
			//
			// x/DE color/ADMI y/ADMI U(y)/ADMI
			// 0.00003 0 -1.4 4.6
			// 0.14676 25 25.0 4.2
			// 0.30064 50 52.2 3.8
			// 0.58520 100 102.1 3.3
			// 0.84068 150 147.1 3.1
			// 1.11837 200 197.2 3.2
			// 1.41480 250 253.0 3.8
			// 2.50704 500 499.0 7.3
			//
			// Die ADMI-Farbzahl ist über DeltaE-Werte von Platin-Kobalt-Lösungen gegen destilliertes Wasser definiert.
			// 50 mm Küvette
			//
			// d = 1			Thickness of the solution layer (Optical Path Length of cuvette) [cm]
			// NULL-Reference	Distilled water
			//
			// The ADMI factor of 1365 used in the calculation of the measurement result can be adjusted by the user.
			// The corrected ADMI factor must then be recalculated as follows:
			//
			// ADMI factor corrected = ADMI factor * ( specified method-check value / measured method-check value)
			//
			// The color of wastewater from a spectrum can be calculated by the third-degree polynomial equation in the unit of ADMI as
			//
			// Eine Lösung mit 50 ADMI-Einheiten weißt also den gleichen E-Wert wie eine
			// Hazen/APHA/PtCo-Standardlösung mit 50 mg/L Pt auf, kann aber auch rot, grün oder blau
			// gefärbt sein. Dabei werden die ADMI-Werte basierend auf der Norm AWWA 2120F über ein
			// Polynom 4. Grades berechnet. Die NULL-Referenz ist dest. Wasser.
			//
			// Developed by the American Dye Manufacturers Institute, the ADMI scale uses a spectral or a
			// tristimulus method to calculate a single colour value that is independent of hue. It is
			// typically used for tinted effluents with colour characteristics that are significantly different
			// from the widely used Pt-Co/Hazen/APHA/Hazen Units.
			//
			ColorScale = {
				Name: 'ADMI Color',
				Standard: 'ASTM 2120 E',
				Range: '0-500',
				Unit: '',
				Decription: 'For colored waters and tinted liquids',
				DeterminationMethod: '',
				ReferenceOpticalPathLength: 1,
				ReferenceNull: 'Distilled water',
				ColorSpace: 'CIE-L*a*b*',
				ColorReference: 'C/2°',
				ChartBackground: 'CIE-Lab-L100.png',
				ChartCurveType: 'function',
				ChartLineWidth: 2,
				Index: {
				}
			};
			break;
		case 14:
			//
			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			//
			// Fig. 15 shows the color graphs of the Iodine, Hazen (APHA) and Gardner scales in the CIE-Labcolor space
			// referred to a cuvette path length of 10mm.
			// The differences in the color hue between the scales are evident here.
			//
			// Das Photometer berechnet die Iodfarbzahl über ein Polynom 3. Grades aus dem Yellowness-Index
			//
			// d = 1			Thickness of the solution layer (Optical Path Length of cuvette) [cm]
			// NULL-Reference	Distilled water
			//
			// 
			//
			ColorScale = {
				Name: 'Iodine Color',
				Standard: 'DIN 6162',
				Range: '0-500',
				Interval: 10,
				Unit: 'mg of iodine per 100ml potassium iodide solution',
				Decription: 'For solvents, plasticisers, resins, oils and fatty acids ranging from yellow to brown. For 1 or less on the Iodine scale, the Pt-Co colour scale is applicable.',
				DeterminationMethod: '',
				ReferenceOpticalPathLength: 1,
				ReferenceNull: 'Distilled water',
				ColorSpace: 'CIE-L*a*b*',
				ColorReference: 'C/2°',
				ChartBackground: 'CIE-Lab-L100.png',
				ChartCurveType: 'function',
				ChartLineWidth: 2,
				Index: {
					'IodineColor-0': '100, 0, 0',
					'IodineColor-1': '100, -2, 6',
					'IodineColor-2': '100, -4.5, 13',
					'IodineColor-3': '100, -6, 17',
					'IodineColor-4': '100, -7.5, 22.5',
					'IodineColor-5': '100, -9, 27.5',
					'IodineColor-6': '100, -10, 32.5',
					'IodineColor-7': '100, -11, 38',
					'IodineColor-10': '100, -12, 49',
					'IodineColor-15': '100, -12, 60.5',
					'IodineColor-20': '100, -10, 73',
					'IodineColor-30': '100, -5, 86',
					'IodineColor-50': '100, 6, 99',
					'IodineColor-90': '100, 19, 104'
				}
			};
			break;
		case 15:
			// Calculation:
			//
			// GTM = G1 + GF
			//
			// G1 takes the Gardner number of the x value that is lower (xlower)
			// GF = [(𝑥𝑢𝑝𝑝𝑒𝑟 − 𝑥𝑙𝑜𝑤𝑒𝑟)(𝑥𝑠𝑎𝑚𝑝𝑙𝑒 − 𝑥𝑙𝑜𝑤𝑒𝑟)+(𝑦𝑢𝑝𝑝𝑒𝑟 − 𝑦𝑙𝑜𝑤𝑒𝑟)(𝑦𝑠𝑎𝑚𝑝𝑙𝑒 − 𝑦𝑙𝑜𝑤𝑒𝑟)] / (𝑥𝑢𝑝𝑝𝑒𝑟 − 𝑥𝑙𝑜𝑤𝑒𝑟)+(𝑦𝑢𝑝𝑝𝑒𝑟 − 𝑦𝑙𝑜𝑤𝑒𝑟)
			//
			// d = 1			Thickness of the solution layer (Optical Path Length of cuvette) [cm]
			// NULL-Reference	Distilled water
			//
			//		'GardnerColor-0': '0.3101, 0.3161, 100',
			//		'GardnerColor-1': '0.3177, 0.3303, 80',
			//		'GardnerColor-2': '0.3233, 0.3352, 79',
			//		'GardnerColor-3': '0.3329, 0.3452, 76',
			//		'GardnerColor-4': '0.3437, 0.3644, 75',
			//		'GardnerColor-5': '0.3558, 0.3840, 74',
			//		'GardnerColor-6': '0.3767, 0.4061, 71',
			//		'GardnerColor-7': '0.4044, 0.4352, 67',
			//		'GardnerColor-8': '0.4207, 0.4498, 64',
			//		'GardnerColor-9': '0.4343, 0.4640, 61',
			//		'GardnerColor-10': '0.4503, 0.4760, 57',
			//		'GardnerColor-11': '0.4842, 0.4818, 45',
			//		'GardnerColor-12': '0.5077, 0.4638, 36',
			//		'GardnerColor-13': '0.5392, 0.4458, 30',
			//		'GardnerColor-14': '0.5646, 0.4270, 22',
			//		'GardnerColor-15': '0.5857, 0.4089, 16',
			//		'GardnerColor-16': '0.6047, 0.3921, 11',
			//		'GardnerColor-17': '0.6290, 0.3701, 6',
			//		'GardnerColor-18': '0.6477, 0.3521, 4'
			//
			ColorScale = {
				Name: 'Gardner Color',
				Standard: 'ASTM D6166',
				Range: '0-18',
				Unit: 'Gardner color units',
				Decription: 'For oils & chemicals ranging from pale yellow to red, including lecithins, resins, drying oils & fatty acids',
				DeterminationMethod: 'Calculated from CIE-xyY coordinates',
				ReferenceOpticalPathLength: 1,
				ReferenceNull: 'Distilled water',
				ColorSpace: 'CIE-xyY',
				ColorReference: 'C/2°',
				ChartBackground: 'CIE-Lab-L75.png',
				ChartCurveType: 'function',
				ChartLineWidth: 2,
				Index: {
					'GardnerColor-0': '100, 0.0474, -0.0122',
					'GardnerColor-1': '91.6849, -2.9989, 6.3170',
					'GardnerColor-2': '91.2343, -2.5657, 8.9501',
					'GardnerColor-3': '89.8593, -2.5532, 13.8843',
					'GardnerColor-4': '89.3930, -5.8727, 22.1153',
					'GardnerColor-5': '88.9225, -8.4859, 30.6371',
					'GardnerColor-6': '87.4850, -8.2057, 41.4562',
					'GardnerColor-7': '85.5039, -7.7982, 56.3439',
					'GardnerColor-8': '83.9658, -6.7595, 64.7260',
					'GardnerColor-9': '82.3787, -6.5500, 72.9031',
					'GardnerColor-10': '80.1796, -4.9527, 81.6169',
					'GardnerColor-11': '72.8919, 3.1312, 93.3665',
					'GardnerColor-12': '66.5199, 13.2699, 89.1803',
					'GardnerColor-13': '61.6542, 24.2295, 93.0038',
					'GardnerColor-14': '54.0270, 31.6094, 87.4491',
					'GardnerColor-15': '46.9745, 36.5304, 78.2072',
					'GardnerColor-16': '39.5805, 39.0180, 67.0597',
					'GardnerColor-17': '29.4125, 39.3712, 50.5190',
					'GardnerColor-18': '23.6714, 39.8853, 40.7829'
				}
			};
			break;
		case 16:
			// Calculated from CIE-XYZ values
			//
			// d = 3.25			Thickness of the solution layer (Optical Path Length of cuvette) [cm]
			// NULL-Reference	Distilled water
			//
			// ASTM Color	Chromaticity Coord.		Luminous Transmittance
			//				(RGB USC system)		(CIE Standard Source C/2°)
			//				Red		Green	Blue	TW
			//
			// 0.5			0.462	0.473	0.065	0.86 +/- 0.06
			// 1.0			0.489	0.475	0.036	0.77 +/- 0.06
			// 1.5			0.521	0.464	0.015	0.67 +/- 0.06
			// 2.0			0.552	0.442	0.006	0.55 +/- 0.06
			// 2.5			0.582	0.416	0.002	0.44 +/- 0.04
			// 3.0			0.611	0.388	0.001	0.31 +/- 0.04
			// 3.5			0.640	0.359	0.001	0.22 +/- 0.04
			// 4.0			0.671	0.328	0.001	0.152 +/- 0.022
			// 4.5			0.703	0.296	0.000	0.109 +/- 0.016
			// 5.0			0.736	0.264	0.000	0.081 +/- 0.012
			// 5.5			0.770	0.230	0.000	0.058 +/- 0.010
			// 6.0			0.805	0.195	0.000	0.040 +/- 0.008
			// 6.5			0.841	0.159	0.000	0.026 +/- 0.006
			// 7.0			0.877	0.123	0.000	0.016 +/- 0.004
			// 7.5			0.915	0.085	0.000	0.0081 +/- 0.0016
			// 8.0			0.956	0.044	0.000	0.0025 +/- 0.0006
			//
			// ASTM = 0.25 + 0.8695 * ( DeltaX + DeltaY + DeltaZ )
			//
			// DX = -log(X/98.072)
			// DY = -log(Y/100)
			// DZ = -log(Z/118.225)
			//

			var DX = -1 * Math.log10(SensorXYZ.X / 0.98072);
			var DY = -1 * Math.log10(SensorXYZ.Y / 1.00000);
			var DZ = -1 * Math.log10(SensorXYZ.Z / 1.18225);

			var ASTM = (0.25 + 0.8695 * ( DX + DY + DZ )).toFixed(1);

			ColorScale = {
				Name: 'ASTM Color',
				Standard: 'ASTM D6045-20, ASTM D1500-07',
				Range: '0.5–8',
				Step: '0.5',
				Unit: 'ASTM color units',
				Decription: 'For a wide range of petroleum products including lubricating oils, heating oils and diesel fuel oils',
				DeterminationMethod: 'Calculated from CIE-XYZ coordinates',
				ReferenceOpticalPathLength: 3.25,
				ReferenceNull: 'Distilled water',
				ColorSpace: 'CIE-XYZ',
				ColorReference: 'C/2°',
				ChartBackground: 'CIE-Lab-L75-ASTM-Color.png',
				ChartCurveType: 'none',
				ChartLineWidth: 0,
				Value: ASTM,
				Index: {
					['ASTMColor-'+ASTM]: 'L: SensorLab.L, a: SensorLab.a, b: SensorLab.b' 
				}
			};
			break;
		case 17:
			// Calculated from CIE-L*a*b*
			//
			// Saybolt = alpha + ( beta / log10(deltaE - teta)
			// alpha = 51.1
			// beta = 44.5
			// teta = 2.55
			// deltaE = CIE1976 ΔE*ab
			//
			// d = 10.0			Thickness of the solution layer (Optical Path Length of cuvette) [cm]
			//
			// The Saybolt color properties are comparable to those of the Hazen scale (APHA):
			//
			// +30 (lightest color, corresponds to approx. 8 to 10 Hazen)
			// -16 (strongest color, corresponds to approx. 350 Hazen)
			//

			var DeltaE = Math.sqrt(Math.pow((100 - SensorLab.L), 2) + Math.pow(SensorLab.a, 2) + Math.pow(SensorLab.b, 2));

			var A = 51.1;
			var B = 44.5;
			var T = 2.55;

			var Saybolt = (A + B / (Math.log10(DeltaE) - T)).toFixed(1);

			ColorScale = {
				Name: 'Saybolt Color',
				Standard: 'ASTM D6045-20, ASTM D156',
				Range: '-16 - +30',
				Unit: 'Saybolt color unit',
				Decription: 'For light colored petroleum products including aviation fuels, kerosene white mineral oils, hydrocarbon solvents and petroleum waxes',
				DeterminationMethod: 'Calculated from CIE-XYZ coordinates',
				ReferenceOpticalPathLength: 10.0,
				ReferenceNull: 'Psychrometric lightness of the dodecane',
				ColorSpace: 'CIE-L*a*b*',
				ColorReference: 'C/2°',
				ChartBackground: 'CIE-Lab-L100.png',
				ChartCurveType: 'none',
				ChartLineWidth: 0,
				Value: Saybolt,
				Index: {
					['SayboltColor-'+Saybolt]: 'L: SensorLab.L, a: SensorLab.a, b: SensorLab.b' 
				}
			};
			break;
		case 18:
			// The European Pharmacopoeia defines three color standards: 
			// - red (cobalt chloride / HCl),
			// - blue (copper chloride / HCl) and
			// - yellow (iron (III) chloride / HCl)
			//
			// These are used to mix five color schemes for the colors according to Ph Eur 2:02:02:
			// - R1 -R7 : red
			// - B1 -B9 : brown
			// - BY1-BY7: brown-yellow
			// - Y1 -Y7 : yellow
			// - GY1-GY7: yellow-green
			//
			ColorScale = {
				Name: 'European Pharmacopoeia (EP) Color',
				Standard: 'Ph. Eur. Method 2.2.2',
				Range: 'B1-B9, BY1-BY7, Y1-Y7, GY1-GY7, R1-R7',
				Unit: 'EP color unit',
				Decription: 'For pharmaceutical solutions',
				DeterminationMethod: 'Calculated from CIE-XYZ coordinates',
				ReferenceOpticalPathLength: 1,
				ReferenceNull: 'Distilled water',
				ColorSpace: 'CIE-L*a*b*',
				ColorReference: 'C/2°',
				ChartBackground: 'CIE-Lab-L100.png',
				ChartCurveType: 'none',
				ChartLineWidth: 0,
				Index: {
					'EP-B1': '88.3, 0.0, 26.2',
					'EP-B2': '91.9, -0.9, 19.1',
					'EP-B3': '93.9, -1.1, 15.3',
					'EP-B4': '95.8, -1.2, 10.9',
					'EP-B5': '97.9, -1.0, 6.1',
					'EP-B6': '99.2, -0.6, 2.7',
					'EP-B7': '99.5, -0.4, 1.8',
					'EP-B8': '99.8, -0.2, 0.9',
					'EP-B9': '99.9, -0.2, 0.6',

					'EP-BY1': '94.4, -6.3, 31.2',
					'EP-BY2': '95.8, -5.9, 24.9',
					'EP-BY3': '97.1, -5.0 , 18.1',
					'EP-BY4': '98.5, -3.3, 10.2',
					'EP-BY5': '99.2, -2.0, 5.5',
					'EP-BY6': '99.7, -0.9, 2.4',
					'EP-BY7': '99.8, -0.5, 1.3',

					'EP-Y1': '96.6, -8.5, 31.6',
					'EP-Y2': '97.5, -7.6, 25.4',
					'EP-Y3': '98.3, -6.2, 18.3',
					'EP-Y4': '99.1, -3.9, 10.2',
					'EP-Y5': '99.5, -2.2 , 5.4',
					'EP-Y6': '99.7, -1.0, 2.5',
					'EP-Y7': '99.9, -0.5 , 1.2',

					'EP-GY1': '98.9, -13.7, 29.8',
					'EP-GY2': '99.4, -9.9, 20.0',
					'EP-GY3': '99.5, -6.4, 12.4',
					'EP-GY4': '99.7, -4.3, 8.0',
					'EP-GY5': '99.8, -2.7, 5.0',
					'EP-GY6': '99.9, -1.5, 2.6',
					'EP-GY7': '99.9, -0.8, 1.4',

					'EP-R1': '91.4, 8.5, 20.3',
					'EP-R2': '93.4, 6.4, 15.5',
					'EP-R3': '95.5, 4.2, 10.5',
					'EP-R4': '96.6, 3.1, 7.9',
					'EP-R5': '97.7, 2.0, 5.4',
					'EP-R6': '98.8, 1.0, 2.8',
					'EP-R7': '99.5, 0.4, 1.2'
				}
			};
			break;
		case 19:
			//
			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			//
			ColorScale = {
				Name: 'US Pharmacopoeia (USP) Color',
				Standard: 'USP (631) Color and Achromicity',
				Range: 'A-T',
				Unit: 'USP color unit',
				Decription: 'For pharmaceutical solutions',
				DeterminationMethod: 'Calculated from CIE-XYZ coordinates',
				ReferenceOpticalPathLength: 5,
				ReferenceNull: 'Distilled water',
				ColorSpace: 'CIE-L*a*b*',
				ColorReference: 'C/2°',
				ChartBackground: 'CIE-Lab-L100.png',
				ChartCurveType: 'none',
				ChartLineWidth: 0,
				Index: {
					'USP-A': '100, -2.24, 18.077',
					'USP-B': '100, 2.08, 31.538',
					'USP-C': '100, -5.52, 26.635',
					'USP-D': '100, 0.24, 23.558',
					'USP-E': '100, 2.8, 50',
					'USP-F': '100, 6.4, 55.481',
					'USP-G': '100, 10.96, 55.481',
					'USP-H': '100, -2, 60.769',
					'USP-I': '100, 6.96, 77.212',
					'USP-J': '100, 7.68, 93.173',
					'USP-K': '100, 18.64, 103.173',
					'USP-L': '100, 26.24, 99.519',
					'USP-M': '100, -15.6, 67.788',
					'USP-N': '100, -21.92, 102.308',
					'USP-O': '100, -12.4, 101.827',
					'USP-P': '100, 4.88, 20.865',
					'USP-Q': '100, 6.96, 15.962',
					'USP-R': '100, 8.48, 20.288',
					'USP-S': '100, 13.92, 8.173',
					'USP-T': '100, 11.92, 25.385'
				}
			};
			break;
		case 20:
			//
			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			//
			ColorScale = {
				Name: 'Chinese Pharmacopoeia (CP) Color',
				Standard: 'CP Appendix IX A',
				Range: 'OR1-OR10,OY1-OY10,Y1-Y10,YG1-YG10,BR1-BR10',
				Unit: 'CP color unit',
				Decription: 'For pharmaceutical solutions',
				DeterminationMethod: 'Calculated from CIE-XYZ coordinates',
				ReferenceOpticalPathLength: 5,
				ReferenceNull: 'Distilled water',
				ColorSpace: 'CIE-L*a*b*',
				ColorReference: 'C/2°',
				ChartBackground: 'CIE-Lab-L100.png',
				ChartCurveType: 'none',
				ChartLineWidth: 0,
				Index: {
					'CP-OR1': '100, 0.522, 7.202',
					'CP-OR2': '100, 1.004, 14.127',
					'CP-OR3': '100, 1.727, 20.36',
					'CP-OR4': '100, 2.691, 26.316',
					'CP-OR5': '100, 3.896, 32.133',
					'CP-OR6': '100, 5.02, 37.396',
					'CP-OR7': '100, 9.759, 53.878',
					'CP-OR8': '100, 13.454, 63.989',
					'CP-OR9': '100, 17.711, 74.238',
					'CP-OR10': '100, 24.378, 87.673',

					'CP-OY1': '100, -0.281, 6.648',
					'CP-OY2': '100, -0.361, 12.95',
					'CP-OY3': '100, -0.04, 19.114',
					'CP-OY4': '100, 0.281, 24.584',
					'CP-OY5': '100, 0.763, 29.848',
					'CP-OY6': '100, 1.406, 34.695',
					'CP-OY7': '100, 3.815, 48.269',
					'CP-OY8': '100, 6.546, 59.488',
					'CP-OY9': '100, 9.518, 69.044',
					'CP-OY10': '100, 14.096, 81.371',

					'CP-Y1': '100, -1.968, 8.033',
					'CP-Y2': '100, -3.574, 15.928',
					'CP-Y3': '100, -4.779, 22.853',
					'CP-Y4': '100, -5.582, 29.294',
					'CP-Y5': '100, -6.225, 35.734',
					'CP-Y6': '100, -6.466, 41.551',
					'CP-Y7': '100, -6.145, 57.271',
					'CP-Y8': '100, -4.618, 70.222',
					'CP-Y9': '100, -2.61, 80.886',
					'CP-Y10': '100, 1.647, 95.014',

					'CP-YG1': '100, -3.253, 7.41',
					'CP-YG2': '100, -6.064, 14.404',
					'CP-YG3': '100, -8.554, 21.053',
					'CP-YG4': '100, -10.803, 27.355',
					'CP-YG5': '100, -12.651, 33.241',
					'CP-YG6': '100, -14.257, 38.643',
					'CP-YG7': '100, -17.871, 53.116',
					'CP-YG8': '100, -20.281, 65.305',
					'CP-YG9': '100, -21.647, 75.069',
					'CP-YG10': '100, -22.691, 87.673',

					'CP-BR1': '100, 2.209, 4.086',
					'CP-BR2': '100, 3.976, 7.895',
					'CP-BR3': '100, 5.663, 11.496',
					'CP-BR4': '100, 7.028, 14.958',
					'CP-BR5': '100, 8.394, 18.283',
					'CP-BR6': '100, 9.518, 21.26',
					'CP-BR7': '100, 12.41, 29.501',
					'CP-BR8': '100, 14.337, 36.357',
					'CP-BR9': '100, 15.622, 42.036',
					'CP-BR10': '100, 16.667, 49.169'
				}
			};
			break;
		case 21:
			ColorScale = {
				Name: 'ColorChecker Patches (2005)',
				Standard: 'CIE-L*a*b* reference colors',
				Range: '1-24',
				Unit: '',
				Decription: '',
				DeterminationMethod: 'Calculated from CIE-XYZ coordinates',
				ReferenceOpticalPathLength: 'n/a',
				ReferenceNull: 'n/a',
				ColorSpace: 'CIE-L*a*b*',
				ColorReference: 'D65/2°',
				ChartBackground: 'CIE-Lab-L100.png',
				ChartCurveType: 'none',
				ChartLineWidth: 0,
				Index: {
					'ColorChecker-1-Dark-Skin': '37.77320582, 12.59128198, 13.73769561',
					'ColorChecker-2-Light-Skin': '65.43191905, 16.84716181, 17.38241346',
					'ColorChecker-3-Blue-Sky': '50.22174301, -2.30111402, -21.54911359',
					'ColorChecker-4-Foliage': '43.04120381, -14.9435302, 22.05079801',
					'ColorChecker-5-Blue-Flower': '55.36543671, 11.46277348, -25.15763139',
					'ColorChecker-6-Bluish-Green': '70.91359483, -33.08127098, 0.267569665',
					'ColorChecker-7-Orange': '62.03635424, 33.60758734, 56.36103711',
					'ColorChecker-8-Purplish-Blue': '40.6608605, 16.04386551, -45.13955717',
					'ColorChecker-9-Moderate-Red': '50.61971705, 47.69824032, 15.19530812',
					'ColorChecker-10-Purple': '30.44292876, 24.88978119, -21.58988957',
					'ColorChecker-11-Yellow-Green': '72.28547874, -27.94505961, 57.86987406',
					'ColorChecker-12-Orange-Yellow': '71.3861192, 15.89028483, 67.70785468',
					'ColorChecker-13-Blue': '29.57402748, 20.59672549, -49.21016282',
					'ColorChecker-14-Green': '55.23286542, -41.2087517, 31.93417479',
					'ColorChecker-15-Red': '41.46806294, 52.74966561, 26.8685097',
					'ColorChecker-16-Yellow': '81.22210753, -0.439269695, 80.26582009',
					'ColorChecker-17-Magenta': '51.72649032, 51.21386006, -15.23923141',
					'ColorChecker-18-Cyan': '51.56289275, -23.96845056, -27.84527594',
					'ColorChecker-19-White': '96.5298366, -0.534422137, 1.181524596',
					'ColorChecker-20-Neutral-8': '81.26440787, -0.604227742, -0.322113965',
					'ColorChecker-21-Neutral-6.5': '66.77572154, -0.683791931, -0.488050042',
					'ColorChecker-22-Neutral-5': '50.87069005, -0.127084092, -0.265109789',
					'ColorChecker-23-Neutral-3.5': '35.67120505, -0.302024432, -1.212622414',
					'ColorChecker-24-Black': '20.47143293, 0.013936713, -0.962268947'
				}
			};
			break;
	}
}



