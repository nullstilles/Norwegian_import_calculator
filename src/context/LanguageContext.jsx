import { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage || 'no';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
    }, [language]);

    // Dictionary of translations
    const translations = {
        no: {
            nav: {
                home: 'Hjem',
                toll: 'Toll',
                strom: 'Strøm',
                bil: 'Bil',
                valuta: 'Valuta',
                uke: 'Uke',
                prosent: 'Prosent',
                excel: 'Excel AI',
                json: 'JSON Dev'
            },
            home: {
                title: 'Velkommen til NorTools',
                subtitle: 'Din samling av nyttige norske verktøy',
                tools: 'Våre Verktøy',
                cta: 'Kom i gang',
                features: {
                    toll: {
                        title: 'Tollkalkulator',
                        desc: 'Beregn importavgifter for varer til Norge.'
                    },
                    strom: {
                        title: 'Strømstøtte',
                        desc: 'Sjekk hvor mye strømstøtte du får.'
                    },
                    bil: {
                        title: 'Bilavgift',
                        desc: 'Beregn engangsavgift ved import av bil.'
                    },
                    valuta: {
                        title: 'Valuta',
                        desc: 'Live valutakurser (NOK, USD, EUR).'
                    },
                    prosent: {
                        title: 'Prosent Hjelper',
                        desc: 'Enkel utregning av prosent.'
                    },
                    uke: {
                        title: 'Ukenummer',
                        desc: 'Hvilken uke er det? Sjekk datoer.'
                    },
                    json: {
                        title: 'JSON <-> CSV',
                        desc: 'Konverter dataformater for utviklere.'
                    },
                    excel: {
                        title: 'Excel AI',
                        desc: 'Lag Excel-formler med kunstig intelligens.'
                    },
                    coming: {
                        title: 'Kommer snart...',
                        desc: 'Vi jobber med flere verktøy.'
                    }
                },
                common: {
                    goTo: 'Gå til verktøy'
                }
            },
            tollCalc: {
                title: 'Import Kalkulator',
                subtitle: 'Beregn Toll, MVA & Avgifter for Norge',
                priceLabel: 'Varepris & Valuta',
                shippingLabel: 'Fraktkostnad',
                categoryLabel: 'Kategori',
                categories: {
                    electronics: 'Elektronikk (0% Toll)',
                    clothing: 'Klær/Tekstiler (10.7% Toll)',
                    other: 'Annet (0% Toll)'
                },
                voecLabel: 'VOEC Registrert Butikk?',
                voecSublabel: 'f.eks. Zalando, eBay, Amazon',
                clothingInfo: 'Klær inkluderer **10.7% toll** på vareprisen.',
                postenInfo: 'Ikke-VOEC butikker medfører et fortollingsgebyr på **{0} NOK**.',
                results: {
                    itemShipping: 'Vare + Frakt (NOK)',
                    vatCustoms: 'MVA (25%) + Toll',
                    fee: 'Fortollingsgebyr',
                    total: 'Total Kostnad'
                },
                copyButton: 'Kopier Utregning',
                copyAlert: 'Resultat kopiert til utklippstavle!',
                approx: '≈ {0} (Kurs: {1})'
            },
            stromCalc: {
                title: 'Strømstøtte Kalkulator 2026',
                subtitle: 'Regn ut hva du får tilbake på strømregningen',
                priceLabel: 'Gjennomsnittspris (øre/kWh)',
                autoFetch: 'Hentet automatisk for Oslo (NO1) akkurat nå.',
                usageLabel: 'Månedsforbruk (kWh)',
                supportPerKwh: 'Din støtte per kWh (inkl. mva)',
                totalSupport: 'Du får totalt i støtte',
                explanationTitle: 'Hvordan regnes det ut?',
                explanationText: 'Staten dekker 90% av prisen over 77 øre (ekskl. mva). Beløpet utbetales på nettleiefakturaen din.'
            },
            bilCalc: {
                title: 'Omregistreringsavgift',
                subtitle: 'Sjekk hva det koster å omregistrere bilen',
                ageLabel: 'Bilens Årsmodell',
                ages: {
                    new: '2023 eller nyere',
                    mid: '2015 til 2022',
                    old: '2014 eller eldre'
                },
                weightLabel: 'Bilens Egenvekt',
                weights: {
                    low: 'Under 1200 kg',
                    high: 'Over 1200 kg'
                },
                oldCarInfo: 'For eldre biler (2014 og eldre) er avgiften fast uavhengig av vekt.',
                payableLabel: 'Du må betale'
            },
            valutaCalc: {
                title: 'Valuta Kalkulator',
                offline: 'Uten nett',
                amountLabel: 'Beløp',
                convertedLabel: 'Konvertert til',
                loading: 'Laster kurser...',
                rateInfo: '1 {0} = {1} {2}',
                offlineInfo: 'Estimert kurs (Ingen nettverk)'
            },
            prosentCalc: {
                title: 'Prosent Hjelperen',
                tabs: {
                    0: 'Hva er X% av Y?',
                    1: 'X er hvor mange % av Y?',
                    2: 'Økning/Nedgang'
                },
                mode0: {
                    label1: 'Hva er',
                    label2: 'av tallet'
                },
                mode1: {
                    label1: 'er hvor',
                    label2: 'mange % av'
                },
                mode2: {
                    label1: 'Gammel pris / verdi',
                    label2: 'Ny pris / verdi'
                },
                result: 'Svaret er'
            },
            ukeCalc: {
                title: 'Ukenummer',
                subtitle: 'For valgt dato er det uke',
                dateLabel: 'Velg en annen dato'
            },
            jsonCalc: {
                title: 'Utvikler Konverterer',
                errorJson: 'Ugyldig JSON: ',
                errorCsv: 'Ugyldig CSV format',
                inputLabel: 'input.json',
                outputLabel: 'output.csv',
                prettify: 'Prettify',
                minify: 'Minify',
                csvToJson: 'CSV til JSON',
                jsonToCsv: 'Konverter JSON til CSV',
                copy: 'Kopier til utklippstavle',
                placeholders: {
                    json: 'Lim inn JSON her... f.eks. [{"id":1, "navn":"Test"}]',
                    csv: 'CSV resultat vises her...'
                }
            },
            excelCalc: {
                title: 'Excel AI Assistent',
                subtitle: 'Beskriv hva du vil beregne, så skriver jeg formelen for deg.',
                label: 'Din forespørsel',
                placeholder: 'f.eks. Summer kolonne A hvis kolonne B sier "Godkjent", ellers la stå tom...',
                button: 'Generer Formel',
                loading: 'Genererer Magi...',
                copied: 'Kopiert!'
            },
            footer: {
                rights: 'Alle rettigheter reservert.',
                privacy: 'Personvern',
                terms: 'Vilkår'
            }
        },
        en: {
            nav: {
                home: 'Home',
                toll: 'Customs',
                strom: 'Electricity',
                bil: 'Car Tax',
                valuta: 'Currency',
                uke: 'Week',
                prosent: 'Percent',
                excel: 'Excel AI',
                json: 'JSON Dev'
            },
            home: {
                title: 'Welcome to NorTools',
                subtitle: 'Your collection of useful Norwegian tools',
                tools: 'Our Tools',
                cta: 'Get Started',
                features: {
                    toll: {
                        title: 'Customs Calculator',
                        desc: 'Calculate import duties for goods to Norway.'
                    },
                    strom: {
                        title: 'Electricity Support',
                        desc: 'Check how much electricity support you get.'
                    },
                    bil: {
                        title: 'Car Import Tax',
                        desc: 'Calculate one-time fee for importing cars.'
                    },
                    valuta: {
                        title: 'Currency',
                        desc: 'Live exchange rates (NOK, USD, EUR).'
                    },
                    prosent: {
                        title: 'Percent Helper',
                        desc: 'Simple percentage calculation.'
                    },
                    uke: {
                        title: 'Week Number',
                        desc: 'What week is it? Check dates.'
                    },
                    json: {
                        title: 'JSON <-> CSV',
                        desc: 'Convert data formats for developers.'
                    },
                    excel: {
                        title: 'Excel AI',
                        desc: 'Create Excel formulas with AI.'
                    },
                    coming: {
                        title: 'Coming Soon...',
                        desc: 'We are working on more tools.'
                    }
                },
                common: {
                    goTo: 'Go to tool'
                }
            },
            tollCalc: {
                title: 'Import Calculator',
                subtitle: 'Calculate Toll, VAT & Fees for Norway',
                priceLabel: 'Item Price & Currency',
                shippingLabel: 'Shipping Cost',
                categoryLabel: 'Category',
                categories: {
                    electronics: 'Electronics (0% Toll)',
                    clothing: 'Clothing/Textiles (10.7% Toll)',
                    other: 'Other (0% Toll)'
                },
                voecLabel: 'VOEC Registered Store?',
                voecSublabel: 'e.g. Zalando, eBay, Amazon',
                clothingInfo: 'Clothing includes a **10.7% customs duty** on the item price.',
                postenInfo: 'Non-VOEC stores incur a carrier fee of **{0} NOK**.',
                results: {
                    itemShipping: 'Item + Shipping (NOK)',
                    vatCustoms: 'VAT (25%) + Customs',
                    fee: 'Carrier Fee',
                    total: 'Total Real Cost'
                },
                copyButton: 'Copy Breakdown',
                copyAlert: 'Result copied to clipboard!',
                approx: '≈ {0} (Rate: {1})'
            },
            stromCalc: {
                title: 'Electricity Support 2026',
                subtitle: 'Calculate your electricity bill support',
                priceLabel: 'Average Price (øre/kWh)',
                autoFetch: 'Automatically fetched for Oslo (NO1) just now.',
                usageLabel: 'Monthly Usage (kWh)',
                supportPerKwh: 'Your support per kWh (inc. VAT)',
                totalSupport: 'Total Support Received',
                explanationTitle: 'How is it calculated?',
                explanationText: 'The state covers 90% of the price above 77 øre (excl. VAT). The amount is deducted from your grid rent invoice.'
            },
            bilCalc: {
                title: 'Re-registration Fee',
                subtitle: 'Check the cost to re-register a car',
                ageLabel: 'Car Year Model',
                ages: {
                    new: '2023 or newer',
                    mid: '2015 to 2022',
                    old: '2014 or older'
                },
                weightLabel: 'Car Net Weight',
                weights: {
                    low: 'Under 1200 kg',
                    high: 'Over 1200 kg'
                },
                oldCarInfo: 'For older cars (2014 and older), the fee is fixed regardless of weight.',
                payableLabel: 'You must pay'
            },
            valutaCalc: {
                title: 'Currency Calculator',
                offline: 'Offline',
                amountLabel: 'Amount',
                convertedLabel: 'Converted to',
                loading: 'Loading rates...',
                rateInfo: '1 {0} = {1} {2}',
                offlineInfo: 'Estimated rate (No network)'
            },
            prosentCalc: {
                title: 'Percent Helper',
                tabs: {
                    0: 'What is X% of Y?',
                    1: 'X is what % of Y?',
                    2: 'Increase/Decrease'
                },
                mode0: {
                    label1: 'What is',
                    label2: 'of the number'
                },
                mode1: {
                    label1: 'is what',
                    label2: '% of'
                },
                mode2: {
                    label1: 'Old price / value',
                    label2: 'New price / value'
                },
                result: 'The answer is'
            },
            ukeCalc: {
                title: 'Week Number',
                subtitle: 'For the selected date, it is week',
                dateLabel: 'Choose another date'
            },
            jsonCalc: {
                title: 'Developer Converter',
                errorJson: 'Invalid JSON: ',
                errorCsv: 'Invalid CSV format',
                inputLabel: 'input.json',
                outputLabel: 'output.csv',
                prettify: 'Prettify',
                minify: 'Minify',
                csvToJson: 'CSV to JSON',
                jsonToCsv: 'Convert JSON to CSV',
                copy: 'Copy to Clipboard',
                placeholders: {
                    json: 'Paste JSON here... e.g. [{"id":1, "name":"Test"}]',
                    csv: 'CSV output will appear here...'
                }
            },
            excelCalc: {
                title: 'Excel AI Assistant',
                subtitle: 'Describe what you want to calculate, and I\'ll write the formula for you.',
                label: 'Your Request',
                placeholder: 'e.g. Sum column A if column B says \'Approved\', otherwise leave blank...',
                button: 'Generate Formula',
                loading: 'Generating Magic...',
                copied: 'Copied!'
            },
            footer: {
                rights: 'All rights reserved.',
                privacy: 'Privacy',
                terms: 'Terms'
            }
        }
    };

    const t = (key, args = []) => {
        const keys = key.split('.');
        let value = translations[language];
        for (const k of keys) {
            value = value?.[k];
        }
        if (!value) return key;

        if (args.length > 0) {
            return value.replace(/{(\d+)}/g, (match, number) => {
                return typeof args[number] !== 'undefined' ? args[number] : match;
            });
        }
        return value;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
