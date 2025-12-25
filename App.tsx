import React from 'react';
import { 
  BarChart2, 
  Brain, 
  Heart, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MessageSquareQuote, 
  BookOpen, 
  Lightbulb, 
  Target,
  Download
} from 'lucide-react';
import { MOCK_REPORT } from './constants';
import { EmotionPieChart, CognitiveLineChart, MetricSparkline } from './components/Charts';
import { AIChat } from './components/AIChat';

function App() {
  const data = MOCK_REPORT;

  const getTrendIcon = (direction: 'up' | 'down' | 'flat') => {
    switch (direction) {
      case 'up': return <TrendingUp size={16} className="text-green-500" />;
      case 'down': return <TrendingDown size={16} className="text-red-500" />;
      default: return <Minus size={16} className="text-gray-400" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreHexColor = (score: number) => {
    if (score >= 90) return '#16a34a'; // green-600
    if (score >= 75) return '#2563eb'; // blue-600
    if (score >= 60) return '#ca8a04'; // yellow-600
    return '#dc2626'; // red-600
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Navbar/Header */}
      <header className="bg-indigo-900 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-indigo-900 font-bold text-xl shadow-inner">
              醒
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">醒醒机器人</h1>
              <p className="text-xs text-indigo-200">儿童周度心理成长分析报告</p>
            </div>
          </div>
          <div className="hidden sm:block text-right text-xs text-indigo-200">
            <p>报告编号: {data.id}</p>
            <p>周期: {data.dateRange}</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* Child Profile Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img 
            src="https://picsum.photos/150/150" 
            alt="Child Profile" 
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-50 shadow-md"
          />
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{data.childName}</h2>
            <p className="text-gray-500 font-medium mt-1">生理年龄: {data.age}</p>
            <div className="mt-4 bg-indigo-50 rounded-xl p-4 border border-indigo-100 relative overflow-hidden">
              <MessageSquareQuote className="absolute -top-2 -right-2 text-indigo-100 w-24 h-24 -z-0 rotate-12" />
              <div className="relative z-10">
                <p className="text-indigo-900 text-sm leading-relaxed italic">
                  <span className="font-bold block mb-2 not-italic flex items-center sm:justify-start justify-center gap-2">
                    <span className="text-xl">🤖</span> AI 寄语:
                  </span>
                  {data.aiMessage}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Summary Metrics */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="text-indigo-600" />
            <h3 className="text-xl font-bold text-gray-800">第一部分：成长概览</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.metrics.map((metric, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-gray-500 font-medium text-sm">{metric.label}</span>
                  <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${metric.trendDirection === 'up' ? 'bg-green-100 text-green-700' : metric.trendDirection === 'down' ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                    {getTrendIcon(metric.trendDirection)}
                    {metric.trend > 0 ? `${metric.trend}%` : '-'}
                  </div>
                </div>
                
                <div className="flex justify-between items-end mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-bold ${getScoreColor(metric.value)}`}>{metric.value}</span>
                    <span className="text-xs text-gray-400">/ {metric.max}</span>
                  </div>
                  {/* Sparkline inserted here */}
                  <MetricSparkline data={metric.history} color={getScoreHexColor(metric.value)} />
                </div>

                <p className="text-xs text-gray-500 leading-snug border-t border-gray-50 pt-2">
                  {metric.status}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Visual Data Analysis */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Emotion Spectrum */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Heart size={18} className="text-pink-500" /> 情绪光谱分布
            </h4>
            <EmotionPieChart data={data.emotions} />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {data.emotions.slice(0, 2).map((emo, idx) => (
                <div key={idx} className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  <span className="font-bold block text-gray-700">{emo.name}</span>
                  高频词: {emo.keywords.join(', ')}
                </div>
              ))}
            </div>
          </div>

          {/* Cognitive Development */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Brain size={18} className="text-blue-500" /> 认知发展走势
            </h4>
            <CognitiveLineChart data={data.cognitiveHistory} />
            <div className="mt-4 text-xs text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
              <strong>本周亮点:</strong> 词汇量新增15个高级形容词，逻辑关联词使用频率较上月提升30%。
            </div>
          </div>
        </section>

        {/* Section 3: Behavioral Insights */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="text-yellow-500" />
            <h3 className="text-xl font-bold text-gray-800">第三部分：行为洞察与典型场景</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.insights.map((insight, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-100">
                  <h4 className="font-bold text-gray-800">{insight.title}</h4>
                  <div className="flex gap-2 mt-2">
                    {insight.tags.map(tag => (
                      <span key={tag} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="bg-indigo-50/50 p-3 rounded-lg border-l-4 border-indigo-400">
                    <p className="text-sm text-gray-700 italic">“{insight.dialogue}”</p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <span className="font-bold text-gray-800">分析:</span> {insight.analysis}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Theoretical Basis */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
             <div className="flex items-center gap-2">
                <BookOpen className="text-purple-500" />
                <h3 className="text-xl font-bold text-gray-800">第四部分：理论依据</h3>
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">观察点</th>
                  <th className="px-6 py-4 font-semibold">理论支撑</th>
                  <th className="px-6 py-4 font-semibold">深度解读</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.theories.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.point}</td>
                    <td className="px-6 py-4 text-indigo-600 font-medium">{item.theory}</td>
                    <td className="px-6 py-4 text-gray-600 leading-relaxed min-w-[300px]">{item.interpretation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5 & 6: Actionable Tips & Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
             <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
               <Target /> 家长行动指南
             </h3>
             <ul className="space-y-4">
               {data.tips.map((tip, idx) => (
                 <li key={idx} className="flex gap-3 items-start bg-white/10 p-3 rounded-xl border border-white/10">
                   <div className="bg-white text-indigo-600 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                     {idx + 1}
                   </div>
                   <p className="text-sm sm:text-base leading-relaxed text-indigo-50">
                     {tip}
                   </p>
                 </li>
               ))}
             </ul>
          </div>

          <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
            <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2">
              <TrendingUp size={20} /> 下周关注重点
            </h3>
            <ul className="space-y-4">
              {data.nextWeekFocus.map((focus, idx) => (
                <li key={idx} className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 shrink-0"></div>
                  <p className="text-sm text-gray-700 leading-relaxed">{focus}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-orange-200 text-center">
              <button className="text-orange-600 text-sm font-semibold flex items-center justify-center gap-2 hover:underline w-full">
                <Download size={16} /> 导出 PDF 报告
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 py-6 text-center text-gray-400 text-sm">
        <p>每一个孩子都是独一无二的星系。作为陪伴者，我们会持续为您捕捉这些珍贵的成长瞬间。</p>
        <p className="mt-2 text-xs">© 2025 醒醒机器人分析系统 (Xing Xing Robot Analysis System)</p>
      </footer>

      {/* Floating Chat */}
      <AIChat reportData={data} />
    </div>
  );
}

export default App;