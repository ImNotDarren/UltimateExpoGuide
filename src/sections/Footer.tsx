import { Smartphone, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border py-16 px-6 bg-bg-soft">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2.5 justify-center md:justify-start mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent to-cyan flex items-center justify-center shadow-md shadow-accent/20">
                <Smartphone size={14} className="text-white" />
              </div>
              <span className="font-heading font-bold text-sm text-text">
                Ultimate Expo Guide
              </span>
            </div>
            <p className="text-sm text-text-muted max-w-sm leading-relaxed">
              An interactive guide to building mobile apps with React Native & Expo
              for CS 130R at Emory University.
            </p>
          </div>

          <div className="text-center md:text-right space-y-1.5">
            <p className="text-sm text-text-muted flex items-center gap-1.5 justify-center md:justify-end">
              Made with <Heart size={14} className="text-pink" /> by{' '}
              <span className="text-text font-semibold">Darren Liu</span>
            </p>
            <p className="text-xs text-text-muted/60">
              Nell Hodgson Woodruff School of Nursing
            </p>
            <p className="text-xs text-text-muted/60">
              Emory University
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
