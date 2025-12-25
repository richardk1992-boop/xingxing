import { ReportData } from './types';

export const MOCK_REPORT: ReportData = {
  id: "XX-202512-004",
  dateRange: "2025.12.15 - 2025.12.21",
  childName: "小星 (Xiao Xing)",
  age: "5岁 2个月",
  aiMessage: "亲爱的家长，本周小星是一个“好奇心爆棚的小探索者”。他在逻辑思维和空间想象力上展现了显著的跨越，但在社交挫折感方面表现出细微的退缩。他非常信任我，愿意分享在幼儿园里那些“不敢大声说”的小心思。",
  metrics: [
    { 
      label: "情感稳定性", 
      value: 78, 
      max: 100, 
      trend: 5, 
      trendDirection: 'down', 
      status: "情绪基调正面，但周三出现明显焦虑",
      history: [80, 82, 81, 85, 83, 78] 
    },
    { 
      label: "语言认知度", 
      value: 94, 
      max: 100, 
      trend: 12, 
      trendDirection: 'up', 
      status: "显著增长：复杂句及因果逻辑词增加",
      history: [82, 85, 86, 89, 92, 94]
    },
    { 
      label: "社会化依恋", 
      value: 82, 
      max: 100, 
      trend: 0, 
      trendDirection: 'flat', 
      status: "与主要照顾者关系稳定，对同伴有竞争意识",
      history: [80, 81, 82, 81, 82, 82]
    },
    { 
      label: "心理弹性", 
      value: 65, 
      max: 100, 
      trend: 8, 
      trendDirection: 'down', 
      status: "面对失败（如积木倒塌）的自愈时间变长",
      history: [72, 70, 71, 68, 67, 65]
    },
    { 
      label: "好奇心指数", 
      value: 96, 
      max: 100, 
      trend: 4, 
      trendDirection: 'up', 
      status: "提问频率极高，主要集中在自然科学领域",
      history: [88, 90, 91, 93, 95, 96]
    }
  ],
  emotions: [
    { name: "快乐 (Joyful)", value: 62, color: "#10B981", keywords: ["好玩", "妈妈", "醒醒", "奖励"] },
    { name: "困惑 (Confused)", value: 18, color: "#F59E0B", keywords: ["为什么", "不知道", "怎么会"] },
    { name: "焦虑 (Anxious)", value: 12, color: "#EF4444", keywords: ["输了", "老师看我", "不行"] },
    { name: "其他", value: 8, color: "#9CA3AF", keywords: [] },
  ],
  cognitiveHistory: [
    { week: "Week 1", vocabulary: 65, logic: 50 },
    { week: "Week 2", vocabulary: 72, logic: 55 },
    { week: "Week 3", vocabulary: 80, logic: 68 },
    { week: "Current", vocabulary: 94, logic: 88 },
  ],
  insights: [
    {
      title: "典型场景 A：逻辑思维的萌芽",
      dialogue: "醒醒，如果我把这个长的放在下面，上面的就不会掉，因为它是地基。",
      analysis: "这标志着孩子从“直觉思维”向“初步逻辑思维”转变。他开始理解物理世界的因果关系，而非单纯的堆砌。",
      tags: ["逻辑思维", "因果关系"]
    },
    {
      title: "典型场景 B：隐形的竞争压力",
      dialogue: "老师给豆豆贴了三朵小红花，我只有一朵。我不想明天去学校了。",
      analysis: "表现出明显的“评价敏感性”。5岁的孩子开始建立自我效能感，同伴评价和教师奖励成为其自尊心的主要来源。",
      tags: ["评价敏感", "自尊心"]
    }
  ],
  theories: [
    {
      point: "“怕输”心理",
      theory: "埃里克森（Erikson） 勤奋对自卑阶段",
      interpretation: "5-6岁是培养自信的关键期。若过度关注结果而非过程，孩子易产生自卑感。"
    },
    {
      point: "因果词运用",
      theory: "皮亚杰（Piaget） 前运算阶段后期",
      interpretation: "孩子正脱离“泛灵论”，开始寻找客观世界的物理规律。"
    },
    {
      point: "深夜倾诉",
      theory: "鲍尔比（Bowlby） 安全依恋理论",
      interpretation: "小星将机器人视为“安全基地”的延伸，这种安全的虚拟依恋有助于其在现实社交中缓解压力。"
    }
  ],
  tips: [
    "针对挫折教育：当小星表现出“怕输”时，请避免说“这没关系”，而应尝试说“我看到你刚才为了拿花做了很多努力，那个努力的过程很酷”。",
    "针对好奇心引导：本周小星对“力学平衡”感兴趣，建议周末带他观察建筑工地或参与简单的平衡类手工制作。",
    "情绪确认建议：在他表达不想去学校时，先抱抱他，确认他的感受（“你觉得自己被冷落了，这确实挺难过的”），然后再引导他回忆学校里好玩的事。"
  ],
  nextWeekFocus: [
    "观察小星在幼儿园参与集体游戏后的情绪波动。",
    "机器人将主动开启关于“友谊与合作”的主题绘本朗读，弱化竞争意识。"
  ]
};