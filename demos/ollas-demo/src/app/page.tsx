"use client";
import Link from 'next/link';
import { 
  Utensils, Users, Shield, ArrowRight, HeartHandshake, 
  BarChart3, Smartphone, Sparkles, CheckCircle2, Globe, Home
} from 'lucide-react';

export default function LandingDemo() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-600 text-white p-2 rounded-xl">
              <Utensils className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">SIGO-OLLAS</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">Demo Interactiva</span>
          </div>
          <div className="flex items-center space-x-3">
            <Link 
              href="/admin" 
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 transition"
            >
              Panel Administrador
            </Link>
            <Link 
              href="/lideresa" 
              className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-700 transition flex items-center space-x-1.5"
            >
              <span>App Lideresa (Móvil)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-emerald-50/50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Transformando la gestión alimentaria en el Perú</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
              Gestión Inteligente para <span className="text-emerald-600">Ollas Comunes</span>
            </h1>
            <p className="text-lg text-slate-600">
              Plataforma digital para optimizar el control de inventarios, padrón de beneficiarios, distribución de raciones y reportes con IA en tiempo real.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/admin" 
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white font-medium rounded-xl shadow hover:bg-slate-800 transition flex items-center justify-center space-x-2"
              >
                <Shield className="h-5 w-5 text-emerald-400" />
                <span>Probar Vista Administrador</span>
              </Link>
              <Link 
                href="/lideresa" 
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 text-white font-medium rounded-xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition flex items-center justify-center space-x-2"
              >
                <Smartphone className="h-5 w-5" />
                <span>Probar Vista Lideresa (App Móvil)</span>
              </Link>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="bg-emerald-100 text-emerald-700 p-3 rounded-xl w-fit mb-4">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Panel de Control Multi-nivel</h3>
              <p className="text-slate-600 text-sm">
                Monitoreo consolidado de ollas comunes activas, stock de víveres, alertas tempranas y métricas de impacto nutricional.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="bg-emerald-100 text-emerald-700 p-3 rounded-xl w-fit mb-4">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">App Móvil para Lideresas</h3>
              <p className="text-slate-600 text-sm">
                Diseñado para operar en campo de forma intuitiva, registrar asistencia diaria, control de inventario y menús asistidos por IA.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
              <div className="bg-emerald-100 text-emerald-700 p-3 rounded-xl w-fit mb-4">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Transparencia y Seguridad</h3>
              <p className="text-slate-600 text-sm">
                Trazabilidad completa de donaciones y entregas con control de acceso basado en roles y sincronización offline PWA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
          <p>© 2026 SIGO-OLLAS. Demo Interactiva sin backend real (datos simulados en memoria).</p>
        </div>
      </footer>

      <a href="/" style={{position:"fixed",top:8,right:8,zIndex:999999,display:"flex",alignItems:"center",justifyContent:"center",width:40,height:40,borderRadius:12,background:"#000",border:"2px solid rgba(255,255,255,0.6)",boxShadow:"0 4px 16px rgba(0,0,0,0.4)",transition:"all 0.15s"}} aria-label="Volver al portafolio">
        <Home className="h-5 w-5" style={{fill:"white",stroke:"white"}} />
      </a>
    </div>
  );
}
