// Components
import Button from "./components/button/Button.vue";
import Checkbox from "./components/button/Checkbox.vue";
import Radio from "./components/button/Radio.vue";
import RadioGroup from "./components/button/RadioGroup.vue";
import Switch from "./components/button/Switch.vue";
import Input from "./components/form/Input.vue";
import Select from "./components/form/Select.vue";
import Badge from "./components/feedback/Badge.vue";
import Toast from "./components/feedback/Toast.vue";
import Avatar from "./components/feedback/Avatar.vue";
import Spinner from "./components/feedback/Spinner.vue";
import Card from "./components/layout/Card.vue";
import Modal from "./components/layout/Modal.vue";
import Tabs from "./components/layout/Tabs.vue";
import Tab from "./components/layout/Tab.vue";
import TabPanel from "./components/layout/TabPanel.vue";
import DataTable from "./components/data/DataTable.vue";
export {
  Button,
  Input,
  Badge,
  Card,
  Toast,
  Checkbox,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Avatar,
  Spinner,
  Modal,
  Tabs,
  Tab,
  TabPanel,
  DataTable,
};
export type { ButtonVariant, ButtonSize } from "./components/button/Button.vue";
export type { InputType } from "./components/form/Input.vue";
export type { BadgeVariant, BadgeSize } from "./components/feedback/Badge.vue";
export type { ToastVariant } from "./components/feedback/Toast.vue";
export type { SelectOption } from "./components/form/Select.vue";
export type {
  AvatarSize,
  AvatarVariant,
} from "./components/feedback/Avatar.vue";
export type { SpinnerSize } from "./components/feedback/Spinner.vue";
export type { ModalSize } from "./components/layout/Modal.vue";
export type { DataTableColumn } from "./components/data/DataTable.vue";

// Theme system
export { setTheme, baseTheme, darkTheme } from "./themes";
export type { ClearVueTheme } from "./themes";

// Vue plugin
export { ClearVue } from "./plugin";
export type { ClearVueOptions } from "./plugin";
