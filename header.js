const headerContent = `
<header class="bg-white border-b border-slate-200">
    <!-- Top Nav -->
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="index.html" class="flex items-center gap-2">
            <img src="asset/QTick-Logo.png" alt="QTick Logo"
                class="w-8 h-8 rounded-lg shadow-lg shadow-indigo-500/20">
            <span class="text-xl font-bold text-slate-900">QTick</span>
        </a>
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <div class="relative group h-full flex items-center">
                <a href="features.html" class="flex items-center gap-1 hover:text-indigo-600 py-4 cursor-pointer">
                    Platform
                    <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-hover:rotate-180"></i>
                </a>

                <div
                    class="absolute top-full -left-10 w-[900px] bg-white rounded-2xl shadow-xl border border-slate-100 p-6 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50">
                    <div class="grid grid-cols-3 gap-4 mb-4">
                        <!-- Queue Management -->
                        <a href="feature-queue-management.html"
                            class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                            <div
                                class="p-3 bg-indigo-50 text-indigo-600 rounded-lg group-hover/item:scale-110 transition-transform">
                                <i data-lucide="users" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900 mb-1">Queue Management</h4>
                                <p class="text-xs text-slate-500 leading-snug">Smart token system & tracking</p>
                            </div>
                        </a>

                        <!-- Appointment Booking -->
                        <a href="feature-appointment-booking.html"
                            class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                            <div
                                class="p-3 bg-indigo-50 text-indigo-600 rounded-lg group-hover/item:scale-110 transition-transform">
                                <i data-lucide="calendar-check" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900 mb-1">Appointments</h4>
                                <p class="text-xs text-slate-500 leading-snug">Online booking & scheduling</p>
                            </div>
                        </a>

                        <!-- Billing -->
                        <a href="feature-billing-inventory.html"
                            class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                            <div
                                class="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover/item:scale-110 transition-transform">
                                <i data-lucide="receipt" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900 mb-1">Billing & Inventory</h4>
                                <p class="text-xs text-slate-500 leading-snug">Invoices, payments & stock</p>
                            </div>
                        </a>

                        <!-- WhatsApp Marketing -->
                        <a href="feature-whatsapp-marketing.html"
                            class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                            <div
                                class="p-3 bg-green-50 text-green-600 rounded-lg group-hover/item:scale-110 transition-transform">
                                <i data-lucide="message-circle" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900 mb-1">WhatsApp Marketing</h4>
                                <p class="text-xs text-slate-500 leading-snug">Campaigns & automation</p>
                            </div>
                        </a>

                        <!-- Website Builder -->
                        <a href="feature-website-builder.html"
                            class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                            <div
                                class="p-3 bg-sky-50 text-sky-600 rounded-lg group-hover/item:scale-110 transition-transform">
                                <i data-lucide="globe" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900 mb-1">Website Builder</h4>
                                <p class="text-xs text-slate-500 leading-snug">SEO-ready business profile</p>
                            </div>
                        </a>

                        <!-- Review System -->
                        <a href="feature-review-system.html"
                            class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                            <div
                                class="p-3 bg-yellow-50 text-yellow-600 rounded-lg group-hover/item:scale-110 transition-transform">
                                <i data-lucide="star" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900 mb-1">Review System</h4>
                                <p class="text-xs text-slate-500 leading-snug">Automated feedback collection</p>
                            </div>
                        </a>

                         <!-- Loyalty Program -->
                        <a href="feature-loyalty-program.html"
                            class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                            <div
                                class="p-3 bg-pink-50 text-pink-600 rounded-lg group-hover/item:scale-110 transition-transform">
                                <i data-lucide="heart" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900 mb-1">Loyalty Program</h4>
                                <p class="text-xs text-slate-500 leading-snug">Rewards & retention</p>
                            </div>
                        </a>

                        <!-- Analytics -->
                        <a href="feature-analytics.html"
                            class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                            <div
                                class="p-3 bg-purple-50 text-purple-600 rounded-lg group-hover/item:scale-110 transition-transform">
                                <i data-lucide="bar-chart-2" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900 mb-1">Analytics</h4>
                                <p class="text-xs text-slate-500 leading-snug">Business insights & data</p>
                            </div>
                        </a>

                        <!-- Lead Management -->
                        <a href="feature-lead-management.html"
                            class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                            <div
                                class="p-3 bg-orange-50 text-orange-600 rounded-lg group-hover/item:scale-110 transition-transform">
                                <i data-lucide="zap" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900 mb-1">Lead Management</h4>
                                <p class="text-xs text-slate-500 leading-snug">Capture & convert leads</p>
                            </div>
                        </a>
                    </div>

                    <!-- View All Footer -->
                    <div class="text-center pt-4 border-t border-slate-100">
                        <a href="features.html" class="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                            View All Features <i data-lucide="arrow-right" class="w-4 h-4"></i>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Industries Dropdown -->
            <div class="relative group h-full flex items-center">
                <a href="industries.html" class="flex items-center gap-1 hover:text-indigo-600 py-4 cursor-pointer">
                    Industries
                    <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-hover:rotate-180"></i>
                </a>

                <div
                    class="absolute top-full -left-10 w-[600px] bg-white rounded-2xl shadow-xl border border-slate-100 p-6 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50">
                    <div class="grid grid-cols-2 gap-4">
                        <!-- Salon Item -->
                        <a href="industry-salon-software.html"
                            class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                            <div
                                class="p-3 bg-rose-50 text-rose-600 rounded-lg group-hover/item:scale-110 transition-transform">
                                <i data-lucide="scissors" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900 mb-1 text-sm">Salons & Barbers</h4>
                                <p class="text-xs text-slate-500 leading-snug">Stylist booking & chairs</p>
                            </div>
                        </a>

                        <!-- Spa Item -->
                        <a href="industry-spa-software.html"
                            class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                            <div
                                class="p-3 bg-teal-50 text-teal-600 rounded-lg group-hover/item:scale-110 transition-transform">
                                <i data-lucide="flower" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900 mb-1 text-sm">Spas & Wellness</h4>
                                <p class="text-xs text-slate-500 leading-snug">Room allocation & packages</p>
                            </div>
                        </a>

                        <!-- Clinic Item -->
                        <a href="industry-clinic-management.html"
                            class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                            <div
                                class="p-3 bg-cyan-50 text-cyan-600 rounded-lg group-hover/item:scale-110 transition-transform">
                                <i data-lucide="stethoscope" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900 mb-1 text-sm">Clinics & Doctors</h4>
                                <p class="text-xs text-slate-500 leading-snug">Patient queue & prescriptions</p>
                            </div>
                        </a>

                        <!-- Gym Item -->
                        <a href="industry-fitness-gym-software.html"
                            class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                            <div
                                class="p-3 bg-amber-50 text-amber-600 rounded-lg group-hover/item:scale-110 transition-transform">
                                <i data-lucide="dumbbell" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900 mb-1 text-sm">Gyms & Fitness</h4>
                                <p class="text-xs text-slate-500 leading-snug">Class booking & memberships</p>
                            </div>
                        </a>

                        <!-- Gaming Item -->
                        <a href="industry-gaming.html"
                            class="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                            <div
                                class="p-3 bg-violet-50 text-violet-600 rounded-lg group-hover/item:scale-110 transition-transform">
                                <i data-lucide="gamepad-2" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-slate-900 mb-1 text-sm">Gaming Zones</h4>
                                <p class="text-xs text-slate-500 leading-snug">Console time-tracking & billing</p>
                            </div>
                        </a>

                        <!-- View All Link -->
                        <a href="industries.html"
                            class="col-span-2 mt-2 pt-4 border-t border-slate-100 flex items-center justify-center text-sm font-bold text-indigo-600 hover:text-indigo-700">
                            View All Industries <i data-lucide="arrow-right" class="w-4 h-4 ml-1"></i>
                        </a>
                    </div>
                </div>
            </div>
            <a href="blog.html" class="hover:text-indigo-600">Blog</a>
            <a href="about.html" class="hover:text-indigo-600">About Us</a>
            <a href="pricing.html" class="hover:text-indigo-600">Pricing</a>
            <a href="contact.html" class="hover:text-indigo-600">Contact</a>
        </nav>
        <div class="hidden md:flex items-center gap-4">
            <a href="download.html" class="text-sm font-semibold text-slate-700 hover:text-indigo-600">
                Download App
            </a>
            <a href="contact.html"
                class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm shadow-indigo-500/30">
                Get Started
            </a>
        </div>
    </div>
</header>
`;

// Inject Header
document.getElementById('global-header').innerHTML = headerContent;

// Re-initialize Icons
lucide.createIcons();
