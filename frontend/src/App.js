import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, Database, Mail, CreditCard, Search, Bell, RefreshCw, CheckCircle, AlertCircle, Clock } from 'lucide-react';

function App() {
  const [services, setServices] = useState([
    { name: 'Asset Search', endpoint: '/assets', icon: Search, status: 'idle', data: null, color: 'from-blue-500 to-blue-600' },
    { name: 'Email Service', endpoint: '/email', icon: Mail, status: 'idle', data: null, color: 'from-green-500 to-green-600' },
    { name: 'Payment Service', endpoint: '/payment', icon: CreditCard, status: 'idle', data: null, color: 'from-purple-500 to-purple-600' },
    { name: 'Product Service', endpoint: '/product', icon: Database, status: 'idle', data: null, color: 'from-orange-500 to-orange-600' },
    { name: 'Notification Service', endpoint: '/notify', icon: Bell, status: 'idle', data: null, color: 'from-pink-500 to-pink-600' },
    { name: 'Workorder Service', endpoint: '/workorder', icon: Activity, status: 'idle', data: null, color: 'from-indigo-500 to-indigo-600' }
  ]);
  
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const callApi = async (serviceIndex) => {
    const service = services[serviceIndex];
    const newServices = [...services];
    newServices[serviceIndex].status = 'loading';
    setServices(newServices);

    try {
      const response = await axios.get(`http://${window.location.hostname}:8000${service.endpoint}`);
      newServices[serviceIndex].status = 'success';
      newServices[serviceIndex].data = response.data;
      newServices[serviceIndex].lastCalled = new Date();
    } catch (error) {
      newServices[serviceIndex].status = 'error';
      newServices[serviceIndex].data = null;
    }
    setServices(newServices);
  };

  const refreshAll = async () => {
    for (let i = 0; i < services.length; i++) {
      await callApi(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    setLastRefresh(new Date());
  };

  useEffect(() => {
    if (isAutoRefresh) {
      const interval = setInterval(() => {
        refreshAll();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isAutoRefresh]);

  useEffect(() => {
    refreshAll();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'loading':
        return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-300" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-300" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Microservices Dashboard
            </h1>
            <p className="text-gray-300 text-lg mb-6">Real-time monitoring of your microservices architecture</p>
            
            <div className="flex justify-center items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                <span className="text-sm">Live Monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-sm">Last refresh: {lastRefresh.toLocaleTimeString()}</span>
              </div>
              <button
                onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isAutoRefresh 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                Auto-refresh: {isAutoRefresh ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={refreshAll}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.name}
                  className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => callApi(index)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-xl opacity-75 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="relative bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 bg-gradient-to-r ${service.color} rounded-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{service.name}</h3>
                          <p className="text-gray-400 text-sm">{service.endpoint}</p>
                        </div>
                      </div>
                      {getStatusIcon(service.status)}
                    </div>
                    
                    <div className="bg-gray-900 bg-opacity-50 rounded-lg p-3 min-h-[80px]">
                      {service.data ? (
                        <pre className="text-green-400 text-xs overflow-x-auto whitespace-pre-wrap">
                          {JSON.stringify(service.data, null, 2)}
                        </pre>
                      ) : (
                        <div className="text-gray-500 text-sm flex items-center justify-center h-full">
                          {service.status === 'loading' ? 'Fetching data...' : 'Click to fetch data'}
                        </div>
                      )}
                    </div>
                    
                    {service.lastCalled && (
                      <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {service.lastCalled.toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>Services Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Kong Gateway Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Real-time Updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
