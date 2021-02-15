function GetColorScale(SelectedColorScale)
{
	switch (SelectedColorScale)
	{
		case 0:
			ColorScale = {
				Name: 'None'
			};
			break;
		case 1:
			ColorScale = {
				Name: 'Iodine Color Number',
				Standard: 'mg of iodine per 100ml potassium iodide solution (DIN 6162)',
				Range: '0-120',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'D65/2°',
				CurveType: 'function',
				LineWidth: 3,
				Index: {
					'IodineColor-0': '0, 0, 0',
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
		case 2:
			// Measure yellow hues in liquids (DIN ISO 6271)
			// Calibration standard with 500 mg/l Pt/Co 500 (500 Hazen)
			//
			// E430 = 0.115
			// E455 = 0.135
			// E480 = 0.115
			// E510 = 0.06
			//
			// (Optical path length: 10 mm)
			//
			ColorScale = {
				Name: 'Hazen/APHA/PtCo Color Number',
				Standard: '',
				Range: '0-1000',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'D65/2°',
				Index: {
				}
			};
			break;
		case 3:
			// Calculation:
			//
			// GTM = G1 + GF
			//
			// G1 takes the Gardner number of the x value that is lower (xlower)
			// GF = [(𝑥𝑢𝑝𝑝𝑒𝑟−𝑥𝑙𝑜𝑤𝑒𝑟)(𝑥𝑠𝑎𝑚𝑝𝑙𝑒−𝑥𝑙𝑜𝑤𝑒𝑟)+(𝑦𝑢𝑝𝑝𝑒𝑟−𝑦𝑙𝑜𝑤𝑒𝑟)(𝑦𝑠𝑎𝑚𝑝𝑙𝑒−𝑦𝑙𝑜𝑤𝑒𝑟)] / (𝑥𝑢𝑝𝑝𝑒𝑟−𝑥𝑙𝑜𝑤𝑒𝑟)+(𝑦𝑢𝑝𝑝𝑒𝑟−𝑦𝑙𝑜𝑤𝑒𝑟)
			//
			ColorScale = {
				Name: 'Gardner Color Number',
				Standard: 'Calculated from CIE-xyY values (ASTM Standard D6616 (2012), EN ISO 4630-2)',
				Range: '0-18',
				ColorSpace: 'CIE-xyY',
				Reference: 'C/2°',
				Index: {
					'GardnerColor-0': '0.3101, 0.3161, 100',
					'GardnerColor-1': '0.3177, 0.3303, 80',
					'GardnerColor-2': '0.3233, 0.3352, 79',
					'GardnerColor-3': '0.3329, 0.3452, 76',
					'GardnerColor-4': '0.3437, 0.3644, 75',
					'GardnerColor-5': '0.3558, 0.3840, 74',
					'GardnerColor-6': '0.3767, 0.4061, 71',
					'GardnerColor-7': '0.4044, 0.4352, 67',
					'GardnerColor-8': '0.4207, 0.4498, 64',
					'GardnerColor-9': '0.4340, 0.4640, 61',
					'GardnerColor-10': '0.4503, 0.4760, 57',
					'GardnerColor-11': '0.4842, 0.4818, 45',
					'GardnerColor-12': '0.5077, 0.4638, 36',
					'GardnerColor-13': '0.5392, 0.4458, 30',
					'GardnerColor-14': '0.5646, 0.4270, 22',
					'GardnerColor-15': '0.5857, 0.4089, 16',
					'GardnerColor-16': '0.6047, 0.3921, 11',
					'GardnerColor-17': '0.6290, 0.3701, 6',
					'GardnerColor-18': '0.6477, 0.3521, 4'
				}
			};
			break;
		case 4:
			ColorScale = {
				Name: 'Lovibond Color System',
				Standard: '',
				Range: '',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'D65/2°',
				Index: {
				}
			};
			break;
		case 5:
			ColorScale = {
				Name: 'European Pharmacopoeia (EP) Color Determination',
				Standard: 'Colors in CIE-L*a*b* colorimetric system',
				Range: 'B, BY, Y, GY, R',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'D65/2°',
				Index: {
				}
			};
			break;
		case 6:
			ColorScale = {
				Name: 'US Pharmacopoeia (USP) Color Determination',
				Standard: 'Colors in CIE-L*a*b* colorimetric system',
				Range: 'A - T',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'D65/2°',
				Index: {
				}
			};
			break;
		case 7:
			ColorScale = {
				Name: 'Chinese Pharmacopoeia (CP) Color Determination',
				Standard: 'Colors in CIE-L*a*b* colorimetric system',
				Range: 'OR,OY,Y,YG,BR',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'D65/2°',
				Index: {
				}
			};
			break;
		case 8:
			// Calculated from Absorbance (KlettPhot = E470)
			//
			// Absorption of a sample liquid in a square cuvette of 4cm (or 2cm) path length measured through a blue filter
			//
			ColorScale = {
				Name: 'Klett Color Number',
				Standard: '',
				Range: '',
				Range: '0-1000',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'D65/2°',
				Index: {
				}
			};
			break;
		case 9:
			// Calculated from Absorbance
			//
			// Cosmetic industry, color evaluation of fat derivatives
			// R, G and B are the color components for the red (640 nm), green (560nm) and blue (464nm) shares
			//
			// H-I = (R + G + B) * 6 / layerthickness
			//
			// R = 43,45 * E640
			// G = 162,38 * E560
			// B = 22,89 * ( E460 + E470 ) / 2
			//
			ColorScale = {
				Name: 'Hess-Ives Color Number',
				Standard: '',
				Range: '',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'D65/2°',
				Index: {
				}
			};
			break;
		case 10:
			// Calculated from CIE-L*a*b* or CIE-XYZ values
			//
			// Yi = 100 * ( Tx - Tz / Ty ) Tx, Ty, Tz => transmission ????
			//
			ColorScale = {
				Name: 'Yellowness Index (ASTM D1925)',
				Standard: 'For transparent liquids on the basis of CIE XYZ-tristimulus values',
				Range: '',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'C/2°',
				Index: {
				}
			};
			break;
		case 11:
			//Die ADMI-Farbzahl ist über E-Werte von Platin-Kobalt-Lösungen gegen destilliertes Wasser definiert.
			//
			ColorScale = {
				Name: 'ADMI Color Number',
				Standard: '',
				Range: '',
				Range: '0-500',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'D65/2°',
				Index: {
				}
			};
			break;
		case 12:
			ColorScale = {
				Name: 'Acid Wash Color Determination',
				Standard: '',
				Range: '0-14',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'D65/2°',
				Index: {
				}
			};
			break;
		case 13:
			// Calculated from Absorbance (25 * E430, Optical path length: 10 mm)
			//
			ColorScale = {
				Name: 'EBC Brewery Color Number',
				Standard: '',
				Range: '',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'D65/2°',
				Index: {
				}
			};
			break;
		case 14:
			// Calculated from Absorbance (??????? 12.7 * E430, Optical path length: 10 mm)
			//
			// 1 ASBC = 0.375 EBC color + 0.46
			ColorScale = {
				Name: 'ASBC Brewery Color Number',
				Standard: '',
				Range: '',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'D65/2°',
				Index: {
				}
			};
			break;
		case 15:
			// ASTM D1500-07
			// https://www.mn-net.com/media/pdf/23/0d/df/Instruction-919600-919650-spectrophotometers-NANOCOLOR-UVVISII-VISII-DE.pdf
			// Calculated from CIE-XYZ values
			// Scale: 0.5 - 8
			// Steps: 0.5
			ColorScale = {
				Name: 'ASTM-Farbzahl',
				Standard: '',
				Range: '',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'D65/2°',
				Index: {
				}
			};
			break;
		case 16:
			// Calculated from CIE-L*a*b* or CIE-XYZ values
			//
			ColorScale = {
				Name: 'Saybolt-Farbzahl',
				Standard: '',
				Range: '',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'D65/2°',
				Index: {
				}
			};
			break;
		case 17:
			// Calculated from Absorbance
			//
			ColorScale = {
				Name: 'ICUMSA Suguar Color',
				Standard: '',
				Range: '',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'D65/2°',
				Index: {
				}
			};
			break;
		case 18:
			// Spectral Absorption Coefficient describes the yellow colouring of potable-, used- or wastewater.
			// The measuring range is indicated in m-1. (Extinction per meter optical path lenght [Ext/m]).

			ColorScale = {
				Name: 'SAC436',
				Standard: 'Calculated from Absorbance (E436)',
				Range: '',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'D65/2°',
				Index: {
				}
			};
			break;
		case 19:
			ColorScale = {
				Name: 'ColorChecker Patches (2005)',
				Standard: 'CIE-L*a*b* reference colors',
				Range: '1-24',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'D65/2°',
				CurveType: 'none',
				LineWidth: 0,
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



