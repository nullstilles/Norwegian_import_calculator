import { Shield, Mail } from 'lucide-react';

const Personvern = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl mx-auto flex items-center justify-center mb-4">
                    <Shield className="text-nordic-accent w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Personvernerklæring</h1>
                <p className="text-slate-400">Sist oppdatert: {new Date().toLocaleDateString('no-NO')}</p>
            </div>

            <div className="prose prose-invert prose-lg mx-auto bg-nordic-card p-8 rounded-3xl border border-slate-800 shadow-xl">
                <h3>1. Eier og behandlingsansvarlig</h3>
                <p>
                    Denne nettsiden (NorTools) drives som et hobbyprosjekt.
                    <br />
                    <strong>Kontakt:</strong> [Ditt Navn / E-post her]
                </p>

                <h3>2. Hva lagrer vi?</h3>
                <p>
                    Vi lagrer ingen personlig identifiserbar informasjon (PII) på våre servere.
                    All kalkulasjon skjer i din nettleser.
                </p>
                <ul>
                    <li><strong>Lokale innstillinger:</strong> Vi lagrer dine valg (f.eks. samtykke til cookies) i din nettleser (LocalStorage).</li>
                    <li><strong>Analyse (valgfritt):</strong> Hvis du samtykker, bruker vi tredjepartsverktøy (som Google Analytics) for å se aggregert besøksstatistikk.</li>
                </ul>

                <h3>3. Informasjonskapsler (Cookies)</h3>
                <p>
                    Informasjonskapsler er små tekstfiler som lagres på enheten din. Vi bruker følgende typer:
                </p>
                <ul>
                    <li><strong>Nødvendige:</strong> Kreves for at nettsiden skal fungere (f.eks. huske at du har lukket cookie-banneret).</li>
                    <li><strong>Funksjonelle:</strong> Husker dine valg i kalkulatorene (valuta, biltype etc.).</li>
                </ul>

                <h3>4. Dine rettigheter</h3>
                <p>
                    Ettersom vi ikke lagrer personopplysninger om deg, har vi heller ingen data å utlevere eller slette.
                    Hvis du ønsker å slette lokale data, kan du tømme nettleserens historikk og informasjonskapsler.
                </p>

                <h3>5. Kontakt oss</h3>
                <div className="flex items-center gap-2 p-4 bg-slate-800/50 rounded-xl not-prose">
                    <Mail className="text-nordic-accent" size={20} />
                    <span className="text-slate-300">Har du spørsmål? Send en e-post til: <strong>kontakt@nortools.no</strong> (Eksempel)</span>
                </div>
            </div>
        </div>
    );
};

export default Personvern;
