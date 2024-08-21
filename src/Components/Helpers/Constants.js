import ideaIcon from "../../Assets/icons/idea-icon.png";
import brainstormIcon from "../../Assets/icons/brainstorm-icon.png";
import selectedIcon from "../../Assets/icons/selected-icon.png";
import implementedIcon from "../../Assets/icons/implement-icon.png";
import toolsAndTechnologyIcon from "../../Assets/icons/tech-tool.png";
import processIcon from "../../Assets/icons/process.png";
import workLifeIcon from "../../Assets/icons/work-life.png";
import otherIcon from "../../Assets/icons/other.png";

export const initialStages = [
  { name: "Idea", count: 0, icon: ideaIcon },
  { name: "Brainstorm", count: 0, icon: brainstormIcon },
  { name: "Selected", count: 0, icon: selectedIcon },
  { name: "Implemented", count: 0, icon: implementedIcon },
];

export const initialVerticals = [
  { name: "Routing", count: 0, icon: toolsAndTechnologyIcon },
  { name: "Switching", count: 0, icon: processIcon },
  { name: "Security", count: 0, icon: workLifeIcon },
  { name: "Software", count: 0, icon: otherIcon },
];