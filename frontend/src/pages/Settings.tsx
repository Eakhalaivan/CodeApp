import { Container } from '../components/layout/BaseLayout';
import { Card } from '../components/ui/Card';
import { Settings as SettingsIcon, User, Shield, Palette, Save, LogOut, Camera, Trash2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { useAuthStore } from '../store/authStore';
import { useUIStore } from '../store/uiStore';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { SettingsSection } from '../components/ui/SettingsSection';
import { cn } from '../utils/cn';
import { AnimatePresence } from 'framer-motion';
import ch1 from '../assets/ch1.jpg';

type SettingsTab = 'profile' | 'security' | 'appearance' | 'account';

export const Settings = () => {
  const { user } = useAuthStore();
  const { theme, setTheme } = useUIStore();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(ch1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: 'profile', label: 'Public Profile', icon: <User size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'account', label: 'Account', icon: <SettingsIcon size={18} /> },
  ] as const;

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl(`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'user'}`);
  };

  return (
    <Container className="py-12 max-w-6xl">
      <h1 className="text-5xl font-display font-black tracking-tight text-white mb-10 flex items-center gap-4">
        <SettingsIcon className="text-primary" size={48} /> Settings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Sidebar Navigation */}
        <div className="md:col-span-3 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300",
                activeTab === tab.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
          <div className="pt-6 mt-6 border-t border-white/5">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-400 hover:bg-red-400/10 transition-colors">
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="md:col-span-9">
          <Card className="p-8 border-white/5 bg-slate-900/40 backdrop-blur-xl min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <SettingsSection 
                  key="profile"
                  title="Profile Information" 
                  description="This information will be displayed publicly to other coders."
                  icon={<User size={24} />}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-8 mb-8 pb-8 border-b border-white/5">
                    <div className="relative group">
                       <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-primary/20 overflow-hidden">
                          <img 
                            src={avatarUrl} 
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                       </div>
                       <button 
                        onClick={triggerFileInput}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full text-white"
                       >
                          <Camera size={20} />
                       </button>
                       <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept="image/*"
                       />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                       <h3 className="text-lg font-bold text-white mb-1">Your Avatar</h3>
                       <p className="text-sm text-slate-500 mb-4">PNG, JPG or SVG formats accepted. Max 2MB.</p>
                       <div className="flex gap-2 justify-center sm:justify-start">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={triggerFileInput}
                          >
                            Change Avatar
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-400 hover:text-red-300"
                            onClick={handleRemoveAvatar}
                          >
                            Remove
                          </Button>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                    <Input 
                      label="Display Name" 
                      defaultValue={user?.username || ''}
                      placeholder="Enter your name"
                    />
                    <Input 
                      label="Email Address" 
                      defaultValue={user?.email || ''}
                      type="email"
                    />
                  </div>
                  <div className="relative mb-6">
                    <label className="text-xs text-primary font-medium absolute left-4 top-2">Bio</label>
                    <textarea 
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 pt-8 pb-4 text-foreground outline-none transition-all duration-300 focus:border-primary ring-4 ring-primary/10 min-h-[120px]"
                      placeholder="Tell the world about your coding journey..."
                    />
                  </div>
                </SettingsSection>
              )}

              {activeTab === 'security' && (
                <SettingsSection 
                  key="security"
                  title="Password & Security" 
                  description="Manage your password and protect your account."
                  icon={<Shield size={24} />}
                >
                  <div className="max-w-md space-y-4">
                    <Input label="Current Password" type="password" />
                    <Input label="New Password" type="password" />
                    <Input label="Confirm New Password" type="password" />
                  </div>
                  <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl flex items-start gap-3 mt-4">
                     <Shield className="text-primary shrink-0 mt-1" size={18} />
                     <p className="text-sm text-slate-400">
                       Using a strong, unique password helps protect your account from unauthorized access.
                     </p>
                  </div>
                </SettingsSection>
              )}

              {activeTab === 'appearance' && (
                <SettingsSection 
                  key="appearance"
                  title="Appearance" 
                  description="Customize how the platform looks for you."
                  icon={<Palette size={24} />}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div 
                      onClick={() => setTheme('dark')}
                      className={cn(
                        "p-6 rounded-2xl border-2 transition-all cursor-pointer relative group",
                        theme === 'dark' ? "border-primary bg-slate-900/50 shadow-lg shadow-primary/10" : "border-white/5 bg-white/5 hover:border-white/10"
                      )}
                    >
                       {theme === 'dark' && <div className="absolute top-4 right-4 text-primary"><Shield size={20} /></div>}
                       <h3 className={cn("font-bold mb-2", theme === 'dark' ? "text-white" : "text-slate-400")}>Dark Orbit</h3>
                       <p className="text-sm text-slate-500 mb-6">The standard deep space theme with neon accents.</p>
                       <div className="flex gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary" />
                          <div className="w-6 h-6 rounded-full bg-slate-950" />
                          <div className="w-6 h-6 rounded-full bg-slate-800" />
                       </div>
                    </div>
                    
                    <div 
                      onClick={() => setTheme('light')}
                      className={cn(
                        "p-6 rounded-2xl border-2 transition-all cursor-pointer relative group",
                        theme === 'light' ? "border-primary bg-slate-100 shadow-lg shadow-primary/10" : "border-white/5 bg-white/5 hover:border-white/10"
                      )}
                    >
                       {theme === 'light' && <div className="absolute top-4 right-4 text-primary"><Shield size={20} /></div>}
                       <h3 className={cn("font-bold mb-2", theme === 'light' ? "text-slate-900" : "text-slate-400")}>Solar Flare</h3>
                       <p className="text-sm text-slate-500 mb-6">A light, clean theme for daylight coding sessions.</p>
                       <div className="flex gap-2">
                          <div className="w-6 h-6 rounded-full bg-amber-500" />
                          <div className="w-6 h-6 rounded-full bg-white border border-slate-200" />
                          <div className="w-6 h-6 rounded-full bg-slate-100" />
                       </div>
                    </div>
                  </div>
                </SettingsSection>
              )}

              {activeTab === 'account' && (
                <SettingsSection 
                  key="account"
                  title="Account Settings" 
                  description="Manage account deletion and export control."
                  icon={<SettingsIcon size={24} />}
                >
                  <Card className="border-red-500/20 bg-red-500/5 p-6 border-2 hover:bg-red-500/10 transition-colors">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="p-2 bg-red-400/20 rounded-lg text-red-400">
                           <Trash2 size={24} />
                        </div>
                        <div>
                           <h3 className="font-bold text-white">Delete Account</h3>
                           <p className="text-sm text-slate-500">This action is permanent and cannot be undone.</p>
                        </div>
                     </div>
                     <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                        Once you delete your account, all your progress, submissions, 
                        and profile information will be wiped from our servers forever.
                     </p>
                     <Button variant="ghost" className="bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                        Deactivate Account
                     </Button>
                  </Card>
                </SettingsSection>
              )}
            </AnimatePresence>

            <div className="mt-12 pt-8 border-t border-white/5 flex justify-end gap-3">
               <Button variant="outline">Discard Changes</Button>
               <Button 
                onClick={handleSave}
                isLoading={isSaving}
                className="px-8 shadow-xl shadow-primary/20"
               >
                 <Save size={18} className="mr-2" />
                 Save Changes
               </Button>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
};
