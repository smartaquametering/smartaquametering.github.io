function GetColorScale(SelectedColorScale)
{
	switch (SelectedColorScale)
	{
		case 0:
			ColorScale = {
				Name: 'None'
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
			// Photometrisch wird die Platin-Kobalt Farbzahl nach ASTM D5386-05 aus dem Yellowness-Index nach
			// ASTM E313-05 berechnet.
			// Die NULL-Referenz ist dest. Wasser.
			//
			ColorScale = {
				Name: 'Hazen/APHA/PtCo Color Number (ASTM D5386-05)',
				Standard: '',
				Range: '0-1000',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'C/2°',
				Index: {
				}
			};
			break;
		case 4:
			ColorScale = {
				Name: 'Lovibond Color System',
				Standard: '',
				Range: 'Ly: 0-120, Lr: 0-20',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'C/2°',
				Index: {
				}
			};
			break;
		case 5:
			// Die Ph. Eur.-Farbzahl wird in 50 mm Küvetten basierend
			// auf DAB 4.00/2.02.02.00 gemessen.
			// Die NULL-Referenz ist dest. Wasser.
			//
			// Das Photometer bestimmt die
			// DE CIE 1976 Farbabstände der Probe zu allen Kalibrierpunkten. Als Ph. Eur. Farbzahl wird
			// der Name der Farblösung mit dem kleinsten DE-Farbabstand zum Messpunkt angegeben.
			// Wenn der Messpunkt zu weit entfernt von allen Kalibrierpunkten liegt, wird „außerhalb
			// Messbereich“ angegeben. Bei der Ph. Eur. Farbzahl tritt das bei a* < 25 und b* < -5 ein.
			//
			ColorScale = {
				Name: 'European Pharmacopoeia (EP) Color Determination',
				Standard: 'Colors in CIE-L*a*b* colorimetric system',
				Range: 'B1-B9, BY1-BY7, Y1-Y7, GY1-GY7, R1-R7',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'C/2°',
				CurveType: 'function',
				LineWidth: 2,
				Index: {
				}
			};
			break;
		case 6:
			// Optical path length: 50 mm
			//
			ColorScale = {
				Name: 'US Pharmacopoeia (USP) Color Determination',
				Standard: 'Colors in CIE-L*a*b* colorimetric system (ASTM Z 58.7.1 and DIN 6174)',
				Range: 'A-T',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'C/2°',
				CurveType: 'none',
				LineWidth: 0,
				Index: {
				}
			};
			break;
		case 7:
			// Optical path length: 50 mm
			//
			ColorScale = {
				Name: 'Chinese Pharmacopoeia (CP) Color Determination',
				Standard: 'Colors in CIE-L*a*b* colorimetric system',
				Range: 'OR1-OR10,OY1-OY10,Y1-Y10,YG1-YG10,BR1-BR10',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'C/2°',
				CurveType: 'function',
				LineWidth: 2,
				Index: {
				}
			};
			break;
		case 11:
			// Die ADMI-Farbzahl ist über DeltaE-Werte von Platin-Kobalt-Lösungen gegen destilliertes Wasser definiert.
			// 50 mm Küvette
			//
			// Eine Lösung mit 50 ADMI-Einheiten weißt also den gleichen E-Wert wie eine
			// Hazen/APHA/PtCo-Standardlösung mit 50 mg/L Pt auf, kann aber auch rot, grün oder blau
			// gefärbt sein. Dabei werden die ADMI-Werte basierend auf der Norm AWWA 2120F über ein
			// Polynom 4. Grades berechnet. Die NULL-Referenz ist dest. Wasser.
			//
			ColorScale = {
				Name: 'ADMI Color Number',
				Standard: '',
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
				Standard: 'ASTM D848',
				Range: '0-14',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'D65/2°',
				CurveType: 'function',
				LineWidth: 2,
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
			// 32,5 mm Küvetten
			// Die NULL-Referenz ist dest. Wasser.
			//
			// ASTM = 0.25 + 0,8695 * ( DeltaX + DeltaY + DeltaZ )
			//
			// deltaX = -log(X/98.074)
			// deltaY = -log(Y/100)
			// deltaZ = -log(Z/188.232
			//
			ColorScale = {
				Name: 'ASTM-Farbzahl',
				Standard: 'ASTM D1500-07',
				Range: '',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'C/2°',
				Index: {
				}
			};
			break;
		case 16:
			// Calculated from CIE-L*a*b* or CIE-XYZ values
			// 50 mm Küvette
			// Die NULL-Referenz ist dest. Wasser
			//
			// Saybolt = alpha + ( beta / log10(deltaE - O)
			// alpha = 51.1
			// beta = 44.5
			// O = 2.55
			// deltaE = sqrt((100-L*)^2 + a*^2 + b*^2)
			//
			ColorScale = {
				Name: 'Saybolt-Farbzahl',
				Standard: '(ASTM D156, ASTM D6045-12)',
				Range: '-16 - +30',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'C/2°',
				Index: {
				}
			};
			break;
		case 21:
			// Calculated from Absorbance (Eλ)
			//
			// T = IT / I0
			// Eλ = - log ( T ) = log ( 1 / T )
			// SACλ = Eλ / d * 100
			// d = 1
			// NULL-Reference	Distilled water
			//
			// λ				Wavelength [nm]
			// I0				Intensity of incident light [lux]
			// IT				Intensity of transmitted light [lux]
			// T				Transmission
			// Eλ				Absorbance
			// d				Thickness of the solution layer (cuvette) [cm]
			// SACλ				Spectral Absorption Coefficient [m-1]
			//
			// TCS34725 		Blue channel	=> 465 nm (+/- 22 nm)
			//					Green channel	=> 525 nm (+/- 35 nm)
			//					Red channel		=> 615 nm (+/- 15 nm)
			//
			// SAC436 describes the yellow colouring of potable-, used- or wastewater
			// The measuring range is indicated in m-1 (Extinction per meter optical path lenght [Ext/m])
			//
			ColorScale = {
				Name: 'Spectral Absorption Coefficient (SAC)',
				Standard: 'Calculated from Absorbance [m-1]',
				Range: '',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'C/2°',
				Index: {
				}
			};
			break;
		case 22:
			// Calculated from Absorbance (Eλ)
			//
			// EBC = 25 * E430 * d
			// d = 1
			// NULL-Reference	Distilled water
			//
			// d				Thickness of the solution layer (cuvette) [cm]
			//
			ColorScale = {
				Name: 'EBC Brewery Color Number',
				Standard: 'EBC MEBAK 2.16.2',
				Range: '0-60, 120, 50, 25',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'C/2°',
				Index: {
				}
			};
			break;
		case 23:
			// Calculated from Absorbance (Eλ) => EBC Brewery Color Number
			//
			// ASBC = 0.375 * EBC + 0.46
			//
			// EBC				EBC Brewery Color Number
			//
			ColorScale = {
				Name: 'ASBC Brewery Color Number',
				Standard: 'Calculated from EBC MEBAK 2.16.2',
				Range: '',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'C/2°',
				Index: {
				}
			};
			break;
		case 24:
			// Calculated from Absorbance (Eλ)
			//
			// ICUMSA = 1000 * (E420,50Brix) / c * d
			//
			// d = 1
			// NULL-Reference	Distilled water
			//
			// d				Thickness of the solution layer (cuvette) [cm]
			// c				Concentration of suguar in the liquid [g/ml]
			//
			// TCS34725 		Blue channel	=> 465 nm (+/- 22 nm)
			//					Green channel	=> 525 nm (+/- 35 nm)
			//					Red channel		=> 615 nm (+/- 15 nm)
			//
			ColorScale = {
				Name: 'ICUMSA Suguar Color',
				Standard: 'ICUMSA GS1/3-7, GS2/3-9 und GS2/3-10',
				Range: '',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'C/2°',
				Index: {
				}
			};
			break;
		case 25:
			// Calculated from Absorbance (Eλ)
			//
			// H-I = (R + G + B) * 6 / (0.1 * d)
			//
			// R = 43,45 * E640
			// G = 162,38 * E560
			// B = 22,89 * ( E460 + E470 ) / 2
			//
			// d = 1
			// NULL-Reference	Distilled water
			//
			// d				Thickness of the solution layer (cuvette) [cm]
			//
			// TCS34725 		Blue channel	=> 465 nm (+/- 22 nm)
			//					Green channel	=> 525 nm (+/- 35 nm)
			//					Red channel		=> 615 nm (+/- 15 nm)
			//
			// Cosmetic industry, color evaluation of fat derivatives
			// R, G and B are the color components for the red (640 nm), green (560nm) and blue (464nm) shares
			//
			ColorScale = {
				Name: 'Hess-Ives Color Number',
				Standard: 'DGK-Prüfmethode F 050.2',
				Range: '',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'C/2°',
				Index: {
				}
			};
			break;
		case 26:
			// Calculated from Absorbance
			//
			// KlettPhot = E470
			//
			// Absorption of a sample liquid in a square cuvette of 4cm (or 2cm) path length measured through a blue filter
			//
			// Im Gegensatz zu den ersten europäischen Photometern wird als Messwert nicht
			// die Transmission oder Extinktion, sondern ein Wert auf einer willkürlichen logarithmischen
			// Skala von 1 bis 1000, der Klett-Skala, angegeben. Diese Skala folgt dem
			// Lambert-Beer-Gesetz und ist somit proportional der Konzentration. Aufgrund der
			// Eigenschaften von Farbgläsern haben die im Klett-Colorimeter original verwendeten Filter
			// einen relativ großen Durchlassbereich, der Filter KS-42 etwa lässt Licht im Bereich von 400
			// bis 450 nm durch. Die originale Klett-Zahl ist also ein integraler Messwert über einen
			// Bereich von etwa 50 nm.
			//
			ColorScale = {
				Name: 'Klett Color Number',
				Standard: '',
				Range: '0-1000',
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'C/2°',
				Index: {
				}
			};
			break;
		case 31:
			// Calculation:
			//
			// GTM = G1 + GF
			//
			// G1 takes the Gardner number of the x value that is lower (xlower)
			// GF = [(𝑥𝑢𝑝𝑝𝑒𝑟 − 𝑥𝑙𝑜𝑤𝑒𝑟)(𝑥𝑠𝑎𝑚𝑝𝑙𝑒 − 𝑥𝑙𝑜𝑤𝑒𝑟)+(𝑦𝑢𝑝𝑝𝑒𝑟 − 𝑦𝑙𝑜𝑤𝑒𝑟)(𝑦𝑠𝑎𝑚𝑝𝑙𝑒 − 𝑦𝑙𝑜𝑤𝑒𝑟)] / (𝑥𝑢𝑝𝑝𝑒𝑟 − 𝑥𝑙𝑜𝑤𝑒𝑟)+(𝑦𝑢𝑝𝑝𝑒𝑟 − 𝑦𝑙𝑜𝑤𝑒𝑟)
			//
			// d = 1
			// NULL-Reference	Distilled water
			//
			// d				Thickness of the solution layer (cuvette) [cm]
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
		case 32:
			// Calculated from CIE-L*a*b* or CIE-XYZ values
			//
			// Yi = 100 * ( Tx - Tz ) / Ty
			//
			// Tx: amber or red colorimeter reading
			// Ty: blue colorimeter reading
			// Tz: green colorimeter reading
			//
			// YI = 100 * (T680 − T420) / T560
			//
			// TCS34725 		Blue channel	=> 465 nm (+/- 22 nm)
			//					Green channel	=> 525 nm (+/- 35 nm)
			//					Red channel		=> 615 nm (+/- 15 nm)
			//
			// In the tristimulus method is a simple filter photometric construction where the transmitted light
			// beam is dispersed after passing the sample into its red, green and blue proportions by 3 color
			// filters which are adapted to the color sensitivity of the human eye. The transmission intensity is
			// measured by photoreceptors.
			//
			// The measured signal indicates transmittances Tx, Ty or Tz, depending on the color filter
			// employed (X, Y or Z).
			//
			// TN = 100 * ( TNd / 100 )^(1/d)
			// TN ( N = X, Y, Z) (in %) measured with a 1cm path cuvette
			//
			// X = a * Tx + b * Tz
			// Y = Ty
			// Z = c * Tz
			//
			// a = 0.7832 (Reference: C/2° SIST EN 1557:1997)
			// b = 0.1975
			// c = 1.1822
			//
			// As factors a, b and c depend on illuminant and observer, they must be put in correspondingly.
			//
			// On the basis of ISO 11664, the DIN EN 1557[3] also define color measurement at transparent
			// liquids to replace conventional visual color scales[17]. For this measurement, transmittances X, Y, and Z
			// of a sample are determined for 10mm path length.
			//
			// The calculation of color values according to this standard is referred to standard illuminant C and 2°-observer.
			//
			// Fig. 14 compares the EN 1557-standardized transmittance Tz and the visual color scales e.g.
			// Iodine, Hazen, Gardner and Lovibond referred to a cuvette path length of 10mm.
			// The comparison of visual color systems lacks precision owing to hue difference between the systems.
			// The representation in Fig. 14 is just supposed to give a general idea.
			//
			// D1925 yellowness index is calculated by (deprecated):
			//------------------------------------------------------
			//
			// YI = 100 * (1.274641506 * X - 1.057434092 * Z) / Y
			//
			// E313-15 yellowness index is calculated by:
			//------------------------------------------------------
			//
			// YI = (100 * (Cx * X - CZ * Z)) / Y
			//
			// C/2		:	CX	1.2769, CZ	1.0592
			// D65/2	:	CX	1.2985, CZ	1.1335
			// C/10		:	CX	1.2871, CZ	1.0781
			// D65/10	:	CX	1.3013, CZ	1.1498
			//
			// As factors CX and CZ depend on illuminant and observer, they must be put in correspondingly.
			//
			// d = 1
			// NULL-Reference	Distilled water
			//
			// d				Thickness of the solution layer (cuvette) [cm]
			//
			//For transparent liquids on the basis of CIE XYZ-tristimulus values
			//
			ColorScale = {
				Name: 'Yellowness Index (ASTM D 5386-93b, ASTM E313-05)',
				Standard: 'ASTM E 313-05 and ASTM D1925 (deprecated)',
				Range: '0-???',
				ColorSpace: 'CIE XYZ-tristimulus values',
				Reference: 'C/2°',
				Index: {
				}
			};
			break;
		case 1:
			// Fig. 15 shows the color graphs of the Iodine, Hazen (APHA) and Gardner scales in the CIE-Labcolor space
			// referred to a cuvette path length of 10mm.
			// The differences in the color hue between the scales are evident here.
			//
			// Das Photometer berechnet die Iodfarbzahl über ein Polynom 3. Grades aus dem Yellowness-Index
			// 10 mm Küvette
			// Die NULL-Referenz ist dest. Wasser.
			//
			ColorScale = {
				Name: 'Iodine Color Number',
				Standard: 'mg of iodine per 100ml potassium iodide solution (DIN 6162)',
				Range: '0-120',
				Interval: 10,
				ColorSpace: 'CIE-L*a*b*',
				Reference: 'C/2°',
				CurveType: 'function',
				LineWidth: 2,
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
		case 39:
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



