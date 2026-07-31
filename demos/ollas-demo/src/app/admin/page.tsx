"use client";
import { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, LayoutDashboard, Utensils, Users, AlertTriangle, 
  Settings, LogOut, ArrowUpRight, CheckCircle2, TrendingUp, Package, Search, Plus, Filter, Home
} from 'lucide-react';

export default function AdminDemo() {
  const [activeTab, setActiveTab] = useState<'overview' | 'ollas' | 'beneficiarios' | 'alertas'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const ollasComunes = [
    { id: 1, name: "Olla Común 'Esperanza y Fe'", zona: "San Juan de Lurigancho", lider: "Rosa María Quispe", beneficiarios: 120, estado: "Activa", stock: "85%" },
    { id: 2, name: "Olla Común 'Virgen de Guadalupe'", zona: "Villa El Salvador", lider: "Carmen Rosa Huamán", beneficiarios: 95, estado: "Activa", stock: "40%" },
    { id: 3, name: "Olla Común 'Manos Unidas'", zona: "Comas", lider: "Juana Ramos", beneficiarios: 150, estado: "Alerta Stock", stock: "15%" },
    { id: 4, name: "Olla Común 'Nuevo Amanecer'", zona: "Ate Vitarte", lider: "María Elena Torres", beneficiarios: 110, estado: "Activa", stock: "70%" },
  ];

  const filteredOllas = ollasComunes.filter(o => 
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.zona.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.lider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
          <div className="bg-emerald-600 text-white p-2 rounded-xl">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-white text-base">SIGO-OLLAS</h2>
            <p className="text-xs text-slate-400">Panel Administrador</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === 'overview' ? 'bg-emerald-600 text-white shadow-sm' : 'hover:bg-slate-800 text-slate-300'}`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Resumen General</span>
          </button>
          <button 
            onClick={() => setActiveTab('ollas')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === 'ollas' ? 'bg-emerald-600 text-white shadow-sm' : 'hover:bg-slate-800 text-slate-300'}`}
          >
            <Utensils className="h-5 w-5" />
            <span>Ollas Comunes</span>
          </button>
          <button 
            onClick={() => setActiveTab('beneficiarios')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === 'beneficiarios' ? 'bg-emerald-600 text-white shadow-sm' : 'hover:bg-slate-800 text-slate-300'}`}
          >
            <Users className="h-5 w-5" />
            <span>Beneficiarios</span>
          </button>
          <button 
            onClick={() => setActiveTab('alertas')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === 'alertas' ? 'bg-emerald-600 text-white shadow-sm' : 'hover:bg-slate-800 text-slate-300'}`}
          >
            <AlertTriangle className="h-5 w-5" />
            <span>Alertas y Stock</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-1">
          <Link 
            href="/"
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <LogOut className="h-5 w-5" />
            <span>Salir al Landing</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b h-16 flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <span className="md:hidden font-bold text-slate-900">SIGO-OLLAS Admin</span>
            <div className="relative hidden sm:block w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar ollas, zonas o lideresas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900">Coord. Municipal</p>
              <p className="text-xs text-emerald-600 font-medium">Municipalidad Metropolitana</p>
            </div>
            <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 font-bold">
              CM
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-slate-500">Ollas Activas</span>
                    <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl">
                      <Utensils className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">48</h3>
                  <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center">
                    <TrendingUp className="h-3.5 w-3.5 mr-1" /> +3 este mes
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-slate-500">Total Beneficiarios</span>
                    <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">5,420</h3>
                  <p className="text-xs text-blue-600 font-medium mt-2">Padrón verificado</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-slate-500">Raciones Entregadas</span>
                    <div className="bg-amber-50 text-amber-600 p-2.5 rounded-xl">
                      <Package className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">38,950</h3>
                  <p className="text-xs text-slate-500 mt-2">Este mes en curso</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-slate-500">Alertas de Stock</span>
                    <div className="bg-rose-50 text-rose-600 p-2.5 rounded-xl">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">4</h3>
                  <p className="text-xs text-rose-600 font-medium mt-2">Requiere atención</p>
                </div>
              </div>

              {/* Table section */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-lg">Ollas Comunes Registradas</h3>
                  <button 
                    onClick={() => setActiveTab('ollas')}
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
                  >
                    <span>Ver todas</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b">
                        <th className="py-3.5 px-6 font-semibold">Nombre</th>
                        <th className="py-3.5 px-6 font-semibold">Zona / Distrito</th>
                        <th className="py-3.5 px-6 font-semibold">Lideresa</th>
                        <th className="py-3.5 px-6 font-semibold">Beneficiarios</th>
                        <th className="py-3.5 px-6 font-semibold">Stock Actual</th>
                        <th className="py-3.5 px-6 font-semibold">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {ollasComunes.map((olla) => (
                        <tr key={olla.id} className="hover:bg-slate-50/50">
                          <td className="py-4 px-6 font-medium text-slate-900">{olla.name}</td>
                          <td className="py-4 px-6 text-slate-600">{olla.zona}</td>
                          <td className="py-4 px-6 text-slate-600">{olla.lider}</td>
                          <td className="py-4 px-6 text-slate-600 font-medium">{olla.beneficiarios}</td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${parseInt(olla.stock) < 30 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                                  style={{ width: olla.stock }}
                                />
                              </div>
                              <span className="text-xs font-semibold text-slate-700">{olla.stock}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${olla.estado === 'Activa' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                              {olla.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'ollas' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Directorio de Ollas Comunes</h3>
                  <p className="text-sm text-slate-500">Gestión completa de ollas registradas en la municipalidad.</p>
                </div>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition flex items-center space-x-2 w-fit">
                  <Plus className="h-4 w-4" />
                  <span>Nueva Olla Común</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredOllas.map((olla) => (
                  <div key={olla.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{olla.name}</h4>
                        <p className="text-xs text-slate-500">{olla.zona}</p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${olla.estado === 'Activa' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                        {olla.estado}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t text-sm">
                      <div>
                        <p className="text-slate-500 text-xs">Lideresa Responsable</p>
                        <p className="font-medium text-slate-800">{olla.lider}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs">Padrón</p>
                        <p className="font-medium text-slate-800">{olla.beneficiarios} beneficiarios</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'beneficiarios' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Padrón de Beneficiarios Consolidado</h3>
                <p className="text-sm text-slate-500">Validación de familias vulnerables y raciones asignadas.</p>
              </div>
              <div className="p-8 text-center text-slate-500 border border-dashed rounded-xl">
                <Users className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                <p className="font-medium">Módulo de Padrón Integrado Activo</p>
                <p className="text-xs text-slate-400 mt-1">Mostrando 5,420 registros sincronizados de beneficiarios.</p>
              </div>
            </div>
          )}

          {activeTab === 'alertas' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Centro de Alertas Tempranas</h3>
                <p className="text-sm text-slate-500">Monitoreo de desabastecimiento y reportes críticos.</p>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 flex items-start space-x-4">
                  <div className="bg-rose-100 text-rose-700 p-2 rounded-lg mt-0.5">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-rose-900 text-sm">Stock crítico en Olla Común 'Manos Unidas'</h4>
                    <p className="text-xs text-rose-700 mt-1">El stock de víveres secos se encuentra al 15%. Se requiere reabastecimiento urgente programado para esta semana.</p>
                    <span className="text-[10px] text-rose-500 font-semibold mt-2 block">Hace 2 horas</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <a href="/" style={{position:"fixed",top:8,right:8,zIndex:999999,display:"flex",alignItems:"center",justifyContent:"center",width:40,height:40,borderRadius:12,background:"#000",border:"2px solid rgba(255,255,255,0.6)",boxShadow:"0 4px 16px rgba(0,0,0,0.4)",transition:"all 0.15s"}} aria-label="Volver al portafolio">
        <Home className="h-5 w-5" style={{fill:"white",stroke:"white"}} />
      </a>
    </div>
  );
}
