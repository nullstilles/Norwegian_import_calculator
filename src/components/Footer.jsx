const Footer = () => {
    return (
        <footer className="border-t border-slate-800 bg-nordic-dark py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} NorTools. Built for Norway & Developers.
                </p>
                <p className="text-slate-600 text-xs mt-2">
                    Disclaimer: Import calculations are estimates. Always check Tolletaten for official rates.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
