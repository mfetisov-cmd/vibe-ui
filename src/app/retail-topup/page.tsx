'use client';

import { useState, useCallback } from 'react';
import styled, { useTheme, keyframes } from 'styled-components';
import { Button } from '@/shared/ui/vivid-ui/components/ButtonV2';
import { Typography } from '@/shared/ui/vivid-ui/components/Typography';
import { Spacer } from '@/shared/ui/vivid-ui/components/Spacer';
import { Paper } from '@/shared/ui/vivid-ui/components/Paper';
import { Chips } from '@/shared/ui/vivid-ui/components/Chips';
import { Loader } from '@/shared/ui/vivid-ui/components/Loader';
import { Check24 } from '@/shared/ui/vivid-ui/components/Icons/Ic24/Check24';
import { Close24 } from '@/shared/ui/vivid-ui/components/Icons/Ic24/Close24';

const Page = styled.div`
  max-width: 520rem;
  margin: 0 auto;
  min-height: 100vh;
  background: ${(p) => p.theme.token.color.c0};
`;

const DemoBanner = styled(Paper)`
  padding: ${(p) => p.theme.token.spacingM} ${(p) => p.theme.token.spacingL};
  background: ${(p) => p.theme.token.color.c6l};
  border: 1rem solid ${(p) => p.theme.token.color.c6t};
  box-shadow: none;
  margin: ${(p) => p.theme.token.spacingL};
  margin-bottom: 0;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8rem); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Screen = styled.div<{ $visible: boolean }>`
  display: ${(p) => (p.$visible ? 'flex' : 'none')};
  flex-direction: column;
  min-height: 100vh;
  animation: ${fadeIn} 0.3s ease;
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 12rem 16rem;
`;

const NavBtn = styled.button`
  width: 44rem;
  height: 44rem;
  border-radius: ${(p) => p.theme.token.borderRadiusRounded};
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &:hover { background: ${(p) => p.theme.token.color.c5}; }
`;

const ScreenBody = styled.div`
  flex: 1;
  padding: 0 24rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const BottomBar = styled.div`
  padding: 16rem 24rem calc(16rem + env(safe-area-inset-bottom, 16rem));
  margin-top: auto;
`;

const CardVisual = styled.div`
  width: 180rem;
  height: 114rem;
  border-radius: ${(p) => p.theme.token.borderRadiusM};
  margin: 0 auto;
  padding: 16rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: linear-gradient(160deg, #9B59F7 0%, #7D33F6 40%, #5B1FBF 100%);
  position: relative;
  overflow: hidden;
`;

const AmountDisplay = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4rem;
`;

const AmountChip = styled.button<{ $active: boolean }>`
  padding: 12rem 24rem;
  border-radius: ${(p) => p.theme.token.borderRadiusRounded};
  border: 1.5rem solid ${(p) => (p.$active ? p.theme.token.color.c6 : p.theme.token.color.c4)};
  background: ${(p) => (p.$active ? p.theme.token.color.c6l : p.theme.token.color.c0)};
  color: ${(p) => (p.$active ? p.theme.token.color.c6 : p.theme.token.color.c1)};
  font: ${(p) => p.theme.token.font.labelMAcc};
  cursor: pointer;
  transition: all 0.15s;
  -webkit-tap-highlight-color: transparent;
  &:active { transform: scale(0.96); }
  &:hover { border-color: ${(p) => p.theme.token.color.c6}; }
`;

const CenterWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40rem 24rem;
`;

const SuccessCircle = styled.div<{ $bg: string }>`
  width: 80rem;
  height: 80rem;
  border-radius: ${(p) => p.theme.token.borderRadiusRounded};
  background: ${(p) => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AMOUNTS = [100, 200, 500];

type FlowType = 'xsell' | 'non-xsell';
type ScreenState = 'main' | 'processing' | 'success';

export default function RetailTopupPage() {
  const theme = useTheme();
  const [flow, setFlow] = useState<FlowType>('xsell');
  const [screen, setScreen] = useState<ScreenState>('main');
  const [amount, setAmount] = useState(200);

  const handleConfirm = useCallback(() => {
    setScreen('processing');
    setTimeout(() => setScreen('success'), 1800);
  }, []);

  const handleReset = useCallback(() => {
    setScreen('main');
    setAmount(200);
  }, []);

  const switchFlow = useCallback((f: FlowType) => {
    setFlow(f);
    setScreen('main');
    setAmount(200);
  }, []);

  return (
    <Page>
      <DemoBanner type="gray">
        <Typography
          variant="bodyXS"
          weight="semi-bold"
          style={{ textTransform: 'uppercase', letterSpacing: '0.5rem', color: theme.token.color.c6, marginBottom: 8 }}
        >
          Demo: select flow
        </Typography>
        <div style={{ display: 'flex', gap: '8rem', flexWrap: 'wrap' }}>
          <Chips selected={flow === 'xsell'} onClick={() => switchFlow('xsell')} size="small">
            X-sell (balance ≥ 200 €)
          </Chips>
          <Chips selected={flow === 'non-xsell'} onClick={() => switchFlow('non-xsell')} size="small">
            Non x-sell / Apple Pay
          </Chips>
        </div>
      </DemoBanner>

      {/* ═══ ONE SCREEN: card + amount + one-click button ═══ */}
      <Screen $visible={screen === 'main'}>
        <NavBar>
          <NavBtn type="button" onClick={() => alert('Close → Home')}>
            <Close24 color={theme.token.color.c1} size={20} />
          </NavBtn>
        </NavBar>

        <ScreenBody>
          <Spacer size={4} />

          <CardVisual>
            <div>
              <div style={{ font: theme.token.font.labelLAcc, color: '#fff', letterSpacing: '-0.5rem' }}>vivid</div>
              <div style={{ font: theme.token.font.captionS, color: 'rgba(255,255,255,0.5)' }}>Business</div>
            </div>
            <div style={{ font: theme.token.font.captionSAcc, color: 'rgba(255,255,255,0.7)', alignSelf: 'flex-end' }}>VISA</div>
          </CardVisual>

          <Spacer size={6} />

          <Typography variant="h5" align="center">Your virtual card is ready</Typography>
          <Spacer size={1} />
          <Typography variant="bodyS" align="center" color="secondary">
            Add money to start earning up to 10% cashback
          </Typography>

          <Spacer size={6} />

          {/* Pre-filled amount */}
          <AmountDisplay>
            <Typography variant="h3" align="center">{amount}</Typography>
            <Typography variant="h5" align="center" color="secondary">€</Typography>
          </AmountDisplay>

          <Spacer size={4} />

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12rem' }}>
            {AMOUNTS.map((a) => (
              <AmountChip key={a} type="button" $active={amount === a} onClick={() => setAmount(a)}>
                {a} €
              </AmountChip>
            ))}
          </div>
        </ScreenBody>

        <BottomBar>
          {flow === 'xsell' ? (
            <Button variant="primary" size="large" fullWidth onClick={handleConfirm}>
              Add {amount} € from Vivid
            </Button>
          ) : (
            <ApplePayButton amount={amount} onClick={handleConfirm} />
          )}

          <Spacer size={3} />

          <Button variant="ghost" size="large" fullWidth onClick={() => alert('Close → Home')}>
            I&apos;ll top up later
          </Button>
        </BottomBar>
      </Screen>

      {/* ═══ Processing ═══ */}
      <Screen $visible={screen === 'processing'}>
        <CenterWrap>
          <Loader size={48} color={theme.token.color.c6} />
          <Spacer size={6} />
          <Typography variant="h5" align="center">Adding your money…</Typography>
          <Spacer size={2} />
          <Typography variant="bodyS" align="center" color="secondary">
            This only takes a moment
          </Typography>
        </CenterWrap>
      </Screen>

      {/* ═══ Success ═══ */}
      <Screen $visible={screen === 'success'}>
        <CenterWrap>
          <SuccessCircle $bg={theme.token.color.c9t}>
            <Check24 color={theme.token.color.c9} size={40} />
          </SuccessCircle>
          <Spacer size={6} />
          <Typography variant="h4" align="center">You&apos;re in business</Typography>
          <Spacer size={3} />
          <Typography variant="bodyM" align="center" color="secondary">
            {amount} € added to your business card. Cashback is already active.
          </Typography>
        </CenterWrap>

        <BottomBar>
          <Button variant="primary" size="large" fullWidth onClick={handleReset}>
            Start using my card
          </Button>
        </BottomBar>
      </Screen>
    </Page>
  );
}

function ApplePayButton({ amount, onClick }: { amount: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: '100%',
        height: '56rem',
        background: '#000',
        color: '#fff',
        border: 'none',
        borderRadius: '14rem',
        fontSize: '17rem',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6rem',
        fontFamily: 'inherit',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      Add {amount} € with{' '}
      <svg width="50" height="20" viewBox="0 0 50 20" fill="white" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        <path d="M9.6 2.7C10.2 1.9 10.6.8 10.5 0 9.5.1 8.3.6 7.7 1.5 7.1 2.2 6.6 3.3 6.7 4.3 7.8 4.4 8.9 3.5 9.6 2.7Z" />
        <path d="M10.5 4.5C9 4.4 7.7 5.3 7 5.3 6.3 5.3 5.1 4.5 3.9 4.5 2.3 4.6.8 5.4.1 6.8-1.4 9.7.5 14 2 16.1 2.8 17.2 3.7 18.3 4.9 18.3 6 18.2 6.5 17.6 7.8 17.6 9.2 17.6 9.6 18.2 10.9 18.3 12.1 18.3 13 17.2 13.7 16.1 14.6 14.9 15 13.5 15 13.5 15 13.5 12.7 12.5 12.7 10 12.7 7.8 14.5 6.8 14.5 6.7 13.6 5.3 12 4.5 10.5 4.5Z" />
        <path d="M21.6 1.5H25.3C27.7 1.5 29.4 3.2 29.4 5.7 29.4 8.1 27.7 9.8 25.2 9.8H23.4V14.2H21.6V1.5ZM23.4 8.3H24.8C26.6 8.3 27.6 7.4 27.6 5.7 27.6 4 26.6 3.1 24.8 3.1H23.4V8.3Z" />
        <path d="M30.3 11.8C30.3 9.9 31.7 8.8 34.1 8.7L36.9 8.5V7.6C36.9 6.5 36.2 5.8 34.9 5.8 33.8 5.8 33 6.4 32.9 7.3H31.2C31.3 5.5 32.8 4.3 35 4.3 37.3 4.3 38.7 5.5 38.7 7.5V14.2H37V12.6C36.4 13.7 35.1 14.4 33.8 14.4 31.8 14.4 30.3 13.3 30.3 11.8ZM36.9 10.9V10L34.4 10.1C33.1 10.2 32.3 10.8 32.3 11.7 32.3 12.6 33.1 13.2 34.3 13.2 35.8 13.2 36.9 12.2 36.9 10.9Z" />
        <path d="M40.5 18.5V17C40.7 17 41.1 17.1 41.4 17.1 42.2 17.1 42.7 16.7 43 15.8L43.2 15.1 39.5 4.5H41.4L44.1 13.3H44.2L46.8 4.5H48.7L44.8 15.9C44 18.2 43 19 41.3 19 41.1 19 40.7 19 40.5 18.5Z" />
      </svg>
    </button>
  );
}
