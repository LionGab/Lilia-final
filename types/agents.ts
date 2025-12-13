import { AGENT_CATEGORIES, listEnabledAgents } from '../config/agents';

export interface Agent {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  category: 'erl' | 'copywriter' | 'analise' | 'outros';
  color: 'orange' | 'blue' | 'purple' | 'green';
  enabled: boolean;
}

export const AGENTS: Agent[] = listEnabledAgents().map((a) => ({
  id: a.id,
  name: a.name,
  title: a.title,
  description: a.description,
  icon: a.ui.icon,
  tags: a.ui.tags,
  category: a.category,
  color: a.ui.color,
  enabled: a.enabled,
}));

export const CATEGORIES = AGENT_CATEGORIES.map((c) => ({
  id: c.id,
  label: c.label,
  icon: c.icon,
}));

