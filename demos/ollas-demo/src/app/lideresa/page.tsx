"use client";
import { useState } from 'react';
import Link from 'next/link';
import { 
  Smartphone, Utensils, Users, Package, Sparkles, 
  CheckCircle2, Plus, ArrowLeft, Camera, Send, Bell, Home
} from 'lucide-react';

export default function LideresaDemo() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'inventario' | 'padron' | 'menu-ia'>('inicio');
  const [racionesRegistradas, setRacionesRegistradas] = useState(115);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleRegistrar = () => {
    setRacionesRegistradas(prev => prev + 5);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <><div className="min-h-screen bg-slate-900 flex justify-center items-center py-6 px-4">
      {/* Mobile Device Frame */}
      <div className="w-full max-w-sm bg-slate-50 rounded-[40px] shadow-2xl border-4 border-slate-700 overflow-hidden flex flex-col h-[840px] relative">
        
        {/* Mobile Header */}
        <div className="bg-emerald-600 text-white px-6 pt-8 pb-4 rounded-b-3xl shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Link href="/" className="text-emerald-100 hover:text-white text-xs flex items-center space-x-1">
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Salir</span>
              </Link>

            </div>
            <span className="text-xs bg-emerald-700/60 px-2 py-0.5 rounded-full font-medium">Modo Lideresa</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg leading-tight">Olla 'Esperanza y Fe'</h2>
              <p className="text-xs text-emerald-100">San Juan de Lurigancho</p>
            </div>
            <div className="bg-white/20 p-2 rounded-xl">
              <Utensils className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Mobile Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {successMsg && (
            <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 p-3 rounded-xl text-xs flex items-center space-x-2 animate-bounce">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>¡Asistencia y raciones registradas con éxito!</span>
            </div>
          )}

          {activeTab === 'inicio' && (
            <>
              {/* Daily Summary Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Menú del Día</span>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">Asistido por IA</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Seco de Pollo con Locro de Zapallo</h3>
                  <p className="text-xs text-slate-500 mt-1">Aporte nutricional estimado: 650 kcal por ración.</p>
                </div>
                <div className="pt-2 border-t flex justify-between items-center text-sm">
                  <span className="text-slate-600">Raciones preparadas hoy:</span>
                  <span className="font-extrabold text-emerald-600 text-lg">{racionesRegistradas}</span>
                </div>
                <button 
                  onClick={handleRegistrar}
                  className="w-full py-3 bg-emerald-600 text-white font-medium rounded-xl shadow hover:bg-emerald-700 transition text-sm flex items-center justify-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Registrar Entrega Diaria (+5)</span>
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setActiveTab('inventario')}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-left hover:border-emerald-500 transition space-y-2"
                >
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-xl w-fit">
                    <Package className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Inventario</h4>
                  <p className="text-[11px] text-slate-500">85% stock disponible</p>
                </button>

                <button 
                  onClick={() => setActiveTab('menu-ia')}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-left hover:border-emerald-500 transition space-y-2"
                >
                  <div className="bg-amber-50 text-amber-600 p-2 rounded-xl w-fit">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Menú IA</h4>
                  <p className="text-[11px] text-slate-500">Sugerencias óptimas</p>
                </button>
              </div>

              {/* Offline sync status */}
              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <div className="text-xs text-emerald-900">
                  <span className="font-bold">Modo PWA Activo</span>: Sincronizado correctamente con el servidor municipal.
                </div>
              </div>
            </>
          )}

          {activeTab === 'inventario' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base">Inventario de Víveres</h3>
                <button 
                  onClick={() => setActiveTab('inicio')} 
                  className="text-xs text-emerald-600 font-medium"
                >
                  Volver
                </button>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl border flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium text-slate-900">Arroz Superior</p>
                    <p className="text-xs text-slate-500">Saco 50kg</p>
                  </div>
                  <span className="font-bold text-emerald-600">4 sacos</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium text-slate-900">Aceite Vegetal</p>
                    <p className="text-xs text-slate-500">Bidón 10L</p>
                  </div>
                  <span className="font-bold text-emerald-600">2 bidones</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium text-slate-900">Atún en Lata</p>
                    <p className="text-xs text-slate-500">Caja x 48 und</p>
                  </div>
                  <span className="font-bold text-amber-600">1.5 cajas</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'menu-ia' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base flex items-center space-x-1.5">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>Sugerencia IA</span>
                </h3>
                <button 
                  onClick={() => setActiveTab('inicio')} 
                  className="text-xs text-emerald-600 font-medium"
                >
                  Volver
                </button>
              </div>
              <p className="text-xs text-slate-600">Basado en el stock actual de arroz, atún y verduras disponibles:</p>
              <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-2">
                <p className="font-bold">Opción Recomendada: Arroz Chaufa Solidario</p>
                <p>Maximiza el uso de proteínas con alto valor nutricional y requiere mínimo consumo de gas.</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="bg-white border-t px-6 py-3 flex items-center justify-between text-slate-400">
          <button 
            onClick={() => setActiveTab('inicio')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'inicio' ? 'text-emerald-600' : 'hover:text-slate-600'}`}
          >
            <Utensils className="h-5 w-5" />
            <span className="text-[10px] font-medium">Inicio</span>
          </button>
          <button 
            onClick={() => setActiveTab('inventario')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'inventario' ? 'text-emerald-600' : 'hover:text-slate-600'}`}
          >
            <Package className="h-5 w-5" />
            <span className="text-[10px] font-medium">Inventario</span>
          </button>
          <button 
            onClick={() => setActiveTab('menu-ia')}
            className={`flex flex-col items-center space-y-1 ${activeTab === 'menu-ia' ? 'text-emerald-600' : 'hover:text-slate-600'}`}
          >
            <Sparkles className="h-5 w-5" />
            <span className="text-[10px] font-medium">Menú IA</span>
          </button>
        </div>
      </div>
    </div>
      <a href="/" style={{position:"fixed",top:8,right:8,zIndex:999999,display:"flex",alignItems:"center",justifyContent:"center",width:40,height:40,borderRadius:12,background:"#000",border:"2px solid rgba(255,255,255,0.6)",boxShadow:"0 4px 16px rgba(0,0,0,0.4)",transition:"all 0.15s"}} aria-label="Volver al portafolio">
        <Home className="h-5 w-5" style={{fill:"white",stroke:"white"}} />
      </a></>
  );
}
