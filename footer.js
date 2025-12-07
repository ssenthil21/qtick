const footerContent = `
<footer class="bg-white pt-16 pb-8 border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-5 gap-12 mb-12">
            <div class="col-span-1 md:col-span-2">
                <div class="flex items-center gap-2 mb-4">
                    <img src="asset/QTick-Logo.png" alt="QTick Logo"
                        class="w-8 h-8 rounded-lg shadow-lg shadow-indigo-500/20">
                    <span class="text-xl font-bold text-slate-900">QTick</span>
                </div>
                <p class="text-slate-500 mb-6 max-w-sm text-sm leading-relaxed">The all-in-one operating system for
                    modern businesses.</p>
                <div class="flex gap-4 mb-6">
                    <a href="https://www.instagram.com/qtickbiz/" target="_blank" rel="noopener noreferrer"
                        class="text-slate-400 hover:text-pink-600 transition-colors">
                        <i data-lucide="instagram" class="w-5 h-5"></i>
                    </a>
                    <a href="https://www.youtube.com/@qtickbiz" target="_blank" rel="noopener noreferrer"
                        class="text-slate-400 hover:text-red-600 transition-colors">
                        <i data-lucide="youtube" class="w-5 h-5"></i>
                    </a>
                    <a href="https://www.facebook.com/qtickbiz" target="_blank" rel="noopener noreferrer"
                        class="text-slate-400 hover:text-blue-600 transition-colors">
                        <i data-lucide="facebook" class="w-5 h-5"></i>
                    </a>
                    <a href="https://in.linkedin.com/company/qtickbiz" target="_blank" rel="noopener noreferrer"
                        class="text-slate-400 hover:text-blue-700 transition-colors">
                        <i data-lucide="linkedin" class="w-5 h-5"></i>
                    </a>
                </div>
            </div>
            <div>
                <h4 class="font-bold text-slate-900 mb-4">Product</h4>
                <ul class="space-y-2 text-sm text-slate-500">
                    <li><a href="features.html" class="hover:text-indigo-600">Features</a></li>
                    <li><a href="industries.html" class="hover:text-indigo-600">Industries</a></li>
                    <li><a href="pricing.html" class="hover:text-indigo-600">Pricing</a></li>
                    <li><a href="download.html" class="hover:text-indigo-600">Download</a></li>
                    <li><a href="contact.html" class="hover:text-indigo-600">Book Demo</a></li>
                </ul>
            </div>

            <div>
                <h4 class="font-bold text-slate-900 mb-4">Free Tools</h4>
                <ul class="space-y-2 text-sm text-slate-500">
                    <li><a href="tools-salon-roi-calculator.html" class="hover:text-indigo-600">Salon ROI
                            Calc</a>
                    </li>
                    <li><a href="tools-queue-calculator.html" class="hover:text-indigo-600">Queue Cost
                            Calc</a></li>
                </ul>
            </div>


            <div>
                <h4 class="font-bold text-slate-900 mb-4">Support</h4>
                <ul class="space-y-2 text-sm text-slate-500">
                    <li><a href="faq.html" class="hover:text-indigo-600">FAQ</a></li>
                    <li><a href="contact.html" class="hover:text-indigo-600">Contact Us</a></li>
                    <li><a href="blog.html" class="hover:text-indigo-600">Blog</a></li>
                </ul>
            </div>
        </div>
        <div
            class="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
            <div>© 2025 QTick Inc. All rights reserved.</div>
        </div>
    </div>
</footer>
`;

document.getElementById('global-footer').innerHTML = footerContent;
lucide.createIcons();
