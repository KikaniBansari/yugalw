# YUGAL (Reset Box) — Exhaustive Android Studio (Kotlin + Jetpack Compose) Master Specification

> **Source Web Application**: `yugalc` (React 19 + TypeScript + Vite + Tailwind CSS + Web Audio API + Firebase Firestore/Auth)  
> **Target Android Application**: Production-Ready Native Android App in Kotlin  
> **UI Framework**: 100% Jetpack Compose (Material 3) + Glance / Wear-ready architecture  
> **Architecture**: Clean Architecture + MVI (Model-View-Intent) + Single Activity Multi-Screen  
> **Target SDK**: Android 15 (API Level 35) | **Min SDK**: Android 8.0 (API Level 26)  
> **Design Vibe**: Warm tactile Indian sanctuary, organic paper surfaces, sacred amber & spectrum gradients, zero-pressure somatic pace, intimate encrypted private vault.

---

## TABLE OF CONTENTS
1. [Brand Identity, Aesthetics & Philosophy](#1-brand-identity-aesthetics--philosophy)
2. [Complete Design Tokens & UI System](#2-complete-design-tokens--ui-system)
   - 2.1 Color Palette & Semantic Tokens
   - 2.2 Five Wellness Phases Spectrum
   - 2.3 Typography & Font Hierarchy (Outfit)
   - 2.4 Elevation, Shadows & Atmospheric Radial Glows
   - 2.5 Micro-Animations & Dynamic Physics
3. [Sacred Sound & Haptic Synthesis Architecture](#3-sacred-sound--haptic-synthesis-architecture)
   - 3.1 432 Hz Crystal Singing Bowl Engine
   - 3.2 4-Note Sacred Chord Scan Success Chime
   - 3.3 Haptic & Tactile Micro-Feedback
4. [Complete Data Models & Domain Contracts](#4-complete-data-models--domain-contracts)
   - 4.1 All 21 Physical Challenge Cards Schema
   - 4.2 Expert Doctors & Somatic Guides
   - 4.3 Collectible Badges & Skill Shop Catalog
   - 4.4 Cycle, Hormonal & Pregnancy Tracking Data
   - 4.5 User Vault, Encryption & Streak Tracker
   - 4.6 Journal & Public Sanctuary Feed
5. [End-to-End Screen Implementations](#5-end-to-end-screen-implementations)
   - 5.1 Onboarding Flow (7 Screens & Box Activation)
   - 5.2 Header & Audio Status Bar
   - 5.3 Bottom Floating Navigation with Spectrum QR Scan Hub
   - 5.4 Home Dashboard (`HomeScreen`)
   - 5.5 CameraX QR Scanner (`ScannerScreen`)
   - 5.6 Challenge Journey Flow (Unlocked -> Practice -> AI Verification -> Completion)
   - 5.7 Cycle & Rhythm Tab (`CycleTab`: 4 Modes)
   - 5.8 Private Journal & Community Discussion (`JournalTab`)
   - 5.9 Yugal AI Companion (`YugalAiTab` with Triage Safety Protocols)
   - 5.10 Profile & Equilibrium Dashboard (`ProfileTab`)
   - 5.11 All Modals & Sheets (Rewards, Shop, Experts, Affirmations, Settings)
6. [Firebase, Database & Local Storage Layer](#6-firebase-database--local-storage-layer)
   - 6.1 Firestore Collections & Security Rules
   - 6.2 Offline-First Room Database Schema
   - 6.3 Encrypted DataStore for Preferences
7. [Master Android Studio Implementation Prompt](#7-master-android-studio-implementation-prompt)

---

## 1. BRAND IDENTITY, AESTHETICS & PHILOSOPHY

### The Concept
**Yugal** means *a couple, union, harmony in duality*. The app serves as the companion to a **physical 21-day Reset Box** containing 21 tactile wellness cards created specifically by women's health doctors, somatic movement therapists, and perinatal psychologists.

### Core Pillars
1. **Zero Pressure**: No streak shaming, no harsh notifications, no competitive leaderboards. "Take as much unhurried time as your body desires."
2. **Tactile Grounding**: Transitioning the physical weight and paper texture of the physical card box into digital form through cream tones, subtle border halos, gold glows, and organic shapes.
3. **Sacred Acoustics**: No harsh synthetic beeps. All audio is mathematically synthesized at **432 Hz** (pure healing frequency) and sacred intervals (fifth harmonics, C-major pentatonic arpeggios).
4. **Clinical Safety Vault**: Instant emergency healthcare redirection for red-flag symptoms, strictly encrypted local reflections that never train external AI models.

---

## 2. COMPLETE DESIGN TOKENS & UI SYSTEM

### 2.1 Color Palette & Semantic Tokens

```kotlin
package com.yugal.app.ui.theme

import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color

object YugalColors {
    // Canvas & Surfaces (Cream Sanctuary)
    val Cream = Color(0xFFF6EEE1)             // Primary background (Warm organic papyrus)
    val CardSurface = Color(0xFFFFFBF4)       // Primary card surface
    val CardSurfaceElevated = Color(0xFFFFFFFF)// Elevated card popovers / floating pill
    val SandDark = Color(0xFFE8DCC8)          // Desktop outer frame / canvas border
    
    // Core Ink & Typography
    val Ink = Color(0xFF04162A)               // Midnight Indigo Ink (headings, deep cards)
    val Ink80 = Color(0xCC04162A)             // 80% ink for body text
    val Muted = Color(0xFF5B6B7A)             // Slate Grey (subtitles, counts, timestamps)
    val MutedLight = Color(0x995B6B7A)        // 60% muted for placeholders
    
    // Brand Spectrum Accents
    val Amber = Color(0xFFFFB400)             // Primary Brand Gold (actions, coins, highlights)
    val Orange = Color(0xFFF2711C)            // Marigold Orange (vitality, active streak)
    val Coral = Color(0xFFE8452C)             // Deep Coral Red (heart rate, urgent, accents)
    val Magenta = Color(0xFFC94A9B)           // Somatic Lotus Magenta (feelings, intuition)
    val Sky = Color(0xFF1FA9E0)               // Kerala Sky Blue (calm, clarity, ovulation)
    val Violet = Color(0xFF8A4FB8)            // Spiritual Violet (synthesis, understanding)
    val Rust = Color(0xFFC93A22)              // Warm Terracotta Rust (primary text pop)

    // Soft Atmospheric Tints (Chip backgrounds, highlights)
    val AmberTint = Color(0xFFFFE7A8)         // Mood Radiant, coins chip
    val OrangeTint = Color(0xFFFFD9BF)        // Streak fire pill
    val CoralTint = Color(0xFFFFD3CB)         // Connect phase pill
    val MagentaTint = Color(0xFFF7D3E8)       // Feel phase pill
    val SkyTint = Color(0xFFCDEBF8)           // Cycle ovulation pill, calm pill
    val VioletTint = Color(0xFFE8D7F5)        // Understand phase pill

    // Dark Mode Sanctuary
    val DarkBackground = Color(0xFF04162A)
    val DarkSurface = Color(0xFF10263A)
    val DarkSurfaceElevated = Color(0xFF16293A)
    val DarkSurfaceSubtle = Color(0xFF0F1F2D)
    val DarkBorder = Color(0x1FFFFFFF)
    val DarkText = Color(0xFFF6EEE1)
    val DarkTextMuted = Color(0xFFB7C4CE)

    // Gradients
    val SpectrumGradient = Brush.linearGradient(
        colors = listOf(
            Color(0xFFFFB400),
            Color(0xFFF2711C),
            Color(0xFFE8452C),
            Color(0xFFC94A9B),
            Color(0xFF1FA9E0)
        )
    )

    val DarkGoldGradient = Brush.linearGradient(
        colors = listOf(Color(0xFFFFB400), Color(0xFFF2711C))
    )

    val VerificationGradient = Brush.linearGradient(
        colors = listOf(Color(0xFFFFB400), Color(0xFFD6469A), Color(0xFF8A4FB8))
    )
}
```

### 2.2 Five Wellness Phases Spectrum

| Phase | No. | Name | Tagline | Color Hex | Background Tint | Border Color | Glow Shadow |
|---|---|---|---|---|---|---|---|
| **MOVE** | 1 | MOVE | Vitality & Grounding | `#FFB400` | `#FFE7A8` | `rgba(255, 180, 0, 0.55)` | `0 10px 28px -8px rgba(255,180,0,0.35)` |
| **CALM** | 2 | CALM | Stillness & Breath | `#1FA9E0` | `#CDEBF8` | `rgba(31, 169, 224, 0.55)` | `0 10px 28px -8px rgba(31,169,224,0.35)` |
| **FEEL** | 3 | FEEL | Somatic Intuition | `#C94A9B` | `#F7D3E8` | `rgba(201, 74, 155, 0.55)` | `0 10px 28px -8px rgba(201,74,155,0.35)` |
| **UNDERSTAND** | 4 | UNDERSTAND | Clarity & Synthesis | `#8A4FB8` | `#E8D7F5` | `rgba(138, 79, 184, 0.55)` | `0 10px 28px -8px rgba(138,79,184,0.35)` |
| **CONNECT** | 5 | CONNECT | Inner Journey & Resonance | `#E8452C` | `#FFD3CB` | `rgba(232, 69, 44, 0.55)` | `0 10px 28px -8px rgba(232,69,44,0.35)` |

### 2.3 Typography & Font Hierarchy (Outfit)

In Android, load `res/font/outfit_regular.ttf`, `outfit_medium.ttf`, `outfit_semibold.ttf`, `outfit_bold.ttf`, and `outfit_extrabold.ttf`.

```kotlin
package com.yugal.app.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.em
import androidx.compose.ui.unit.sp
import com.yugal.app.R

val OutfitFontFamily = FontFamily(
    Font(R.font.outfit_light, FontWeight.Light),
    Font(R.font.outfit_regular, FontWeight.Normal),
    Font(R.font.outfit_medium, FontWeight.Medium),
    Font(R.font.outfit_semibold, FontWeight.SemiBold),
    Font(R.font.outfit_bold, FontWeight.Bold),
    Font(R.font.outfit_extrabold, FontWeight.ExtraBold)
)

val YugalTypography = Typography(
    // 72sp Light Numeral on Challenge Unlocked
    displayLarge = TextStyle(
        fontFamily = OutfitFontFamily,
        fontWeight = FontWeight.Light,
        fontSize = 72.sp,
        letterSpacing = (-0.04).em,
        lineHeight = 72.sp
    ),
    // 36sp Headline Tight on Challenge Completion
    displayMedium = TextStyle(
        fontFamily = OutfitFontFamily,
        fontWeight = FontWeight.ExtraBold,
        fontSize = 36.sp,
        letterSpacing = (-0.025).em,
        lineHeight = 38.sp
    ),
    // 28sp Page Titles ("Hello, Ananya")
    headlineLarge = TextStyle(
        fontFamily = OutfitFontFamily,
        fontWeight = FontWeight.ExtraBold,
        fontSize = 28.sp,
        letterSpacing = (-0.025).em,
        lineHeight = 32.sp
    ),
    // 22sp Card Headlines ("of 21 challenges completed")
    headlineMedium = TextStyle(
        fontFamily = OutfitFontFamily,
        fontWeight = FontWeight.Bold,
        fontSize = 22.sp,
        lineHeight = 26.sp
    ),
    // 15sp Bold Section Headers ("How are you feeling today?")
    titleMedium = TextStyle(
        fontFamily = OutfitFontFamily,
        fontWeight = FontWeight.ExtraBold,
        fontSize = 15.sp,
        lineHeight = 20.sp
    ),
    // 13sp / 14sp Body
    bodyMedium = TextStyle(
        fontFamily = OutfitFontFamily,
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = 20.sp
    ),
    // 10sp / 11sp Caps Labels ("RESET BOX", "MONDAY, NOV 10")
    labelSmall = TextStyle(
        fontFamily = OutfitFontFamily,
        fontWeight = FontWeight.SemiBold,
        fontSize = 10.sp,
        letterSpacing = 0.15.em
    )
)
```

### 2.4 Shadows, Halos & Dynamic Ambient Lighting

In CSS, Yugal uses specialized blur halos. In Jetpack Compose, replicate these using custom draw modifiers with `drawBehind`:

1. **`shadow-gold-halo`**: `box-shadow: 0 10px 28px -12px rgba(4, 22, 42, 0.12), 0 2px 8px -4px rgba(4, 22, 42, 0.06)`
2. **`shadow-focal-glow`**: `box-shadow: 0 10px 28px -8px rgba(255, 180, 0, 0.35), 0 0 18px 2px rgba(232, 69, 44, 0.12)`
3. **`shadow-coral-halo`**: `box-shadow: 0 8px 22px rgba(255, 180, 0, 0.32)`
4. **Living Background Orbs**: 3 large blurred ambient spheres placed at the top-left (Amber, blur 90dp, opacity 28%), bottom-right (Sky, blur 90dp, opacity 22%), and center (Magenta, blur 100dp, opacity 14%).

---

## 3. SACRED SOUND & HAPTIC SYNTHESIS ARCHITECTURE

The web application uses the Web Audio API to synthesize sacred harmonics dynamically without loading external audio assets. In Android, implement this via `android.media.AudioTrack`:

```kotlin
package com.yugal.app.audio

import android.content.Context
import android.media.AudioAttributes
import android.media.AudioFormat
import android.media.AudioTrack
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlin.math.exp
import kotlin.math.sin

class SacredSoundManager(private val context: Context) {

    private val sampleRate = 44100
    private val vibrator: Vibrator = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        val manager = context.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as VibratorManager
        manager.defaultVibrator
    } else {
        @Suppress("DEPRECATION")
        context.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
    }

    /**
     * Synthesizes 432 Hz crystal singing bowl with natural 1.5x fifth overtone decay
     */
    fun playSingingBowl(fundamentalFreq: Double = 432.0, durationSec: Double = 3.2) {
        CoroutineScope(Dispatchers.Default).launch {
            val numSamples = (sampleRate * durationSec).toInt()
            val buffer = ShortArray(numSamples)
            val overtoneFreq = fundamentalFreq * 1.5

            for (i in 0 until numSamples) {
                val t = i.toDouble() / sampleRate
                
                // Exponential decay envelopes
                val env1 = exp(-t * (4.0 / durationSec)) * if (t < 0.12) (t / 0.12) else 1.0
                val env2 = exp(-t * (7.0 / durationSec)) * if (t < 0.15) (t / 0.15) else 1.0
                
                val wave1 = sin(2.0 * Math.PI * fundamentalFreq * t) * 0.28 * env1
                val wave2 = sin(2.0 * Math.PI * overtoneFreq * t) * 0.09 * env2
                
                val sample = (wave1 + wave2).coerceIn(-1.0, 1.0)
                buffer[i] = (sample * Short.MAX_VALUE).toInt().toShort()
            }

            playBuffer(buffer)
        }
    }

    /**
     * Synthesizes 4-note ascending sacred chord (C5, E5, G5, C6) for QR scan success
     */
    fun playScanSuccessChime() {
        CoroutineScope(Dispatchers.Default).launch {
            val chord = doubleArrayOf(523.25, 659.25, 783.99, 1046.5) // C5, E5, G5, C6
            val noteDuration = 1.2
            val staggerSec = 0.08
            val totalDuration = noteDuration + (chord.size * staggerSec)
            val numSamples = (sampleRate * totalDuration).toInt()
            val buffer = ShortArray(numSamples)

            for (noteIdx in chord.indices) {
                val freq = chord[noteIdx]
                val startSample = (noteIdx * staggerSec * sampleRate).toInt()
                val noteSamples = (noteDuration * sampleRate).toInt()

                for (i in 0 until noteSamples) {
                    val outIdx = startSample + i
                    if (outIdx >= numSamples) break
                    val t = i.toDouble() / sampleRate
                    val env = exp(-t * 3.5) * if (t < 0.04) (t / 0.04) else 1.0
                    val wave = sin(2.0 * Math.PI * freq * t) * 0.16 * env
                    val currentVal = buffer[outIdx].toDouble() / Short.MAX_VALUE
                    val combined = (currentVal + wave).coerceIn(-1.0, 1.0)
                    buffer[outIdx] = (combined * Short.MAX_VALUE).toInt().toShort()
                }
            }

            playBuffer(buffer)
            triggerSuccessHaptic()
        }
    }

    /**
     * Tactile soft micro-tap frequency sweep (320Hz -> 140Hz)
     */
    fun playSoftTap() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            vibrator.vibrate(VibrationEffect.createPredefined(VibrationEffect.EFFECT_CLICK))
        } else {
            @Suppress("DEPRECATION")
            vibrator.vibrate(15)
        }
    }

    private fun triggerSuccessHaptic() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            vibrator.vibrate(VibrationEffect.createWaveform(longArrayOf(0, 40, 60, 50), -1))
        }
    }

    private fun playBuffer(buffer: ShortArray) {
        val audioTrack = AudioTrack.Builder()
            .setAudioAttributes(
                AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_ASSISTANCE_SONIFICATION)
                    .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                    .build()
            )
            .setAudioFormat(
                AudioFormat.Builder()
                    .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
                    .setSampleRate(sampleRate)
                    .setChannelMask(AudioFormat.CHANNEL_OUT_MONO)
                    .build()
            )
            .setBufferSizeInBytes(buffer.size * 2)
            .setTransferMode(AudioTrack.MODE_STATIC)
            .build()

        audioTrack.write(buffer, 0, buffer.size)
        audioTrack.play()
    }
}
```

---

## 4. COMPLETE DATA MODELS & DOMAIN CONTRACTS

### 4.1 All 21 Physical Challenge Cards Schema

The physical reset box holds **21 numbered cards** categorized into the 5 phases:

```kotlin
// Data repository holding all 21 challenges
val ALL_CHALLENGES = listOf(
    // PHASE 1: MOVE (Cards 1 to 4)
    Challenge(
        id = "chal-1", number = 1, phase = Phase.MOVE, phaseNumber = 1,
        title = "Barefoot Earth Connection",
        shortDesc = "A slow sensory grounding walk to discharge sympathetic nervous static through the soles of your feet.",
        expert = EXPERTS[0], duration = "10 min", intensity = "Gentle", equipment = "No equipment",
        learningPoints = listOf(
            "Unclench unconscious micro-bracing in feet and pelvic basin",
            "Stimulate 7,000 plantar nerve endings through mindful pacing",
            "Ground cortisol buildup after hours of screen exposure"
        ),
        hasVideo = true, videoType = "somatic",
        steps = listOf(
            PracticeStep("0:00 - 2:30", "Arrive and breathe", "Stand tall with feet hip-width apart. Inhale through the nose and sigh out the mouth."),
            PracticeStep("2:30 - 7:30", "Soften into practice", "Step slowly from heel through ball to toe, sensing ground texture."),
            PracticeStep("7:30 - 10:00", "Release and restore", "Stand still, palms open. Feel the upward rebound of earth stability.")
        ),
        closingAffirmation = "Gravity welcomes my complete weight without condition.",
        rewardBadgeId = "badge-grounded", code = "0101", status = ChallengeStatus.COMPLETED
    ),
    Challenge(
        id = "chal-2", number = 2, phase = Phase.MOVE, phaseNumber = 2,
        title = "Pelvic Basin Wave",
        shortDesc = "Gentle micro-tilts and intuitive hip uncoiling to restore bloodflow and warmth to your reproductive basin.",
        expert = EXPERTS[1], duration = "12 min", intensity = "Gentle", equipment = "Yoga mat or soft carpet",
        learningPoints = listOf(
            "Relieve tension held from prolonged seated work",
            "Harmonize pelvic tilt with natural diaphragmatic breathing",
            "Awaken deep cellular warmth throughout the hips"
        ),
        hasVideo = true, videoType = "yoga",
        steps = listOf(
            PracticeStep("0:00 - 3:00", "Supine arrival", "Lie on your back, knees bent, soles flat. Place hands on lower abdomen."),
            PracticeStep("3:00 - 8:00", "Pelvic clock circles", "Imagine a clock under your sacrum. Gently roll your weight through all 12 hours."),
            PracticeStep("8:00 - 12:00", "Stillness integration", "Rest hands on hips, letting breath gently rise and fall like ocean waves.")
        ),
        closingAffirmation = "My hips are allowed to be soft, spacious, and at ease.",
        rewardBadgeId = "badge-flow", code = "0102"
    ),
    Challenge(
        id = "chal-3", number = 3, phase = Phase.MOVE, phaseNumber = 3,
        title = "Shoulder Unburdening Spiral",
        shortDesc = "Soft shoulder blade mobility and spinal spiraling to unlock stored emotional weight.",
        expert = EXPERTS[1], duration = "8 min", intensity = "Gentle", equipment = "No equipment",
        learningPoints = listOf(
            "Melt trap tension from screen posture",
            "Expand chest and thoracic mobility",
            "Release unexpressed conversational pressure"
        ),
        hasVideo = true, videoType = "somatic",
        steps = listOf(
            PracticeStep("0:00 - 2:00", "Gentle roll", "Lift shoulders to ears, roll backward and drop softly with an exhale."),
            PracticeStep("2:00 - 5:30", "Seated spirals", "Twist gently from the belly, letting arms wrap around torso naturally."),
            PracticeStep("5:30 - 8:00", "Eagle arm stretch", "Cross arms and breathe into the upper back between shoulder blades.")
        ),
        closingAffirmation = "I lay down all responsibilities that are not mine to carry.",
        rewardBadgeId = "badge-freedom", code = "0103"
    ),
    Challenge(
        id = "chal-4", number = 4, phase = Phase.MOVE, phaseNumber = 4,
        title = "Rhythmic Joint Lubrication",
        shortDesc = "Gentle circular rotations of wrists, ankles, and neck to stimulate synovial fluids and joint ease.",
        expert = EXPERTS[0], duration = "10 min", intensity = "Gentle", equipment = "No equipment",
        learningPoints = listOf(
            "Stimulate peripheral circulation",
            "Quiet the nervous system through repetitive micro-motion",
            "Prepare the vessel for seated calm"
        ),
        hasVideo = true, videoType = "yoga",
        steps = listOf(
            PracticeStep("0:00 - 3:00", "Wrists & neck", "Circle wrists softly 10 times in each direction, followed by chin-to-chest rolls."),
            PracticeStep("3:00 - 7:00", "Ankles & knees", "Rotate ankles while seated, then gently massage around knee caps."),
            PracticeStep("7:00 - 10:00", "Whole-body shake", "Stand and shake fingers, hands, and feet to release stagnant energy.")
        ),
        closingAffirmation = "My joints move with fluid ease, graceful and free.",
        rewardBadgeId = "badge-vitality", code = "0104"
    ),

    // PHASE 2: CALM (Cards 5 to 9)
    Challenge(
        id = "chal-5", number = 5, phase = Phase.CALM, phaseNumber = 1,
        title = "Ocean Wave Pranayama",
        shortDesc = "A calming Ujjayi breath exercise that simulates the rhythm of gentle waves to quiet mental chatter.",
        expert = EXPERTS[2], duration = "10 min", intensity = "Restorative", equipment = "Meditation cushion or chair",
        learningPoints = listOf(
            "Activate the vagus nerve and parasympathetic system",
            "Lengthen exhalations to lower heart rate",
            "Soothe racing nighttime thoughts"
        ),
        hasVideo = true, videoType = "breath",
        steps = listOf(
            PracticeStep("0:00 - 2:00", "Comfortable seat", "Sit upright with a relaxed spine. Close your eyes and notice current breath."),
            PracticeStep("2:00 - 7:00", "Ocean sound", "Slightly constrict the back of the throat on inhale and exhale, whispering an ocean sound."),
            PracticeStep("7:00 - 10:00", "Silent witness", "Return to normal breath and notice the lingering stillness.")
        ),
        closingAffirmation = "With every breath out, tension leaves; with every breath in, peace arrives.",
        rewardBadgeId = "badge-breath", code = "0205"
    ),
    Challenge(
        id = "chal-6", number = 6, phase = Phase.CALM, phaseNumber = 2,
        title = "Warm Stone Yoga Nidra",
        shortDesc = "A guided body scan meditation focusing on sensations of weight and warmth.",
        expert = EXPERTS[2], duration = "15 min", intensity = "Restorative", equipment = "Blanket or warm shawl",
        learningPoints = listOf(
            "Enter theta brainwave state for deep cellular restoration",
            "Release unconscious clenching across 36 body points",
            "Replenish energy stores without sleeping"
        ),
        hasVideo = true, videoType = "sound",
        steps = listOf(
            PracticeStep("0:00 - 3:00", "Savasana setup", "Lie comfortably with eyes covered. Cover with blanket."),
            PracticeStep("3:00 - 11:00", "Rotation of awareness", "Guide your attention point-by-point through palms, throat, chest, navel, feet."),
            PracticeStep("11:00 - 15:00", "Awakening slowly", "Wiggle toes and fingers. Roll to your right side before sitting up.")
        ),
        closingAffirmation = "Rest is not a reward I earn; it is the soil in which I bloom.",
        rewardBadgeId = "badge-tranquil", code = "0206"
    ),
    Challenge(
        id = "chal-7", number = 7, phase = Phase.CALM, phaseNumber = 3,
        title = "Chandra Bhedana Moon Breath",
        shortDesc = "Left-nostril breathing to cool down internal heat, irritation, and overstimulation.",
        expert = EXPERTS[2], duration = "8 min", intensity = "Restorative", equipment = "Chair or floor cushion",
        learningPoints = listOf(
            "Stimulate the Ida Nadi (cooling lunar energy channel)",
            "Downregulate body temperature and irritability",
            "Prepare mind and body for restorative sleep"
        ),
        hasVideo = true, videoType = "breath",
        steps = listOf(
            PracticeStep("0:00 - 2:00", "Vishnu Mudra", "Fold index and middle fingers into palm. Use right thumb and ring finger."),
            PracticeStep("2:00 - 6:00", "Left Inhale, Right Exhale", "Close right nostril with thumb, inhale through left for 4 counts. Close left, exhale right for 6 counts."),
            PracticeStep("6:00 - 8:00", "Equilibrium rest", "Rest both hands on lap. Inhale through both nostrils softly.")
        ),
        closingAffirmation = "I welcome the cool stillness of the moon within.",
        rewardBadgeId = "badge-cool", code = "0207"
    ),
    Challenge(
        id = "chal-8", number = 8, phase = Phase.CALM, phaseNumber = 4,
        title = "Palm Over Heart Sanctuary",
        shortDesc = "Direct tactile vagal grounding: one palm on the center of the chest, one on the low belly.",
        expert = EXPERTS[0], duration = "7 min", intensity = "Gentle", equipment = "No equipment",
        learningPoints = listOf(
            "Induce oxytocin release via warm self-touch",
            "Slow heart rate variability (HRV) into coherence",
            "Anchor into the body during moments of overwhelm"
        ),
        hasVideo = true, videoType = "somatic",
        steps = listOf(
            PracticeStep("0:00 - 2:00", "Hand placement", "Place dominant palm on sternum, other palm below navel. Sense warmth."),
            PracticeStep("2:00 - 5:00", "Heart-belly breath", "Breathe into top hand, then feel bottom hand rise. Exhale slowly."),
            PracticeStep("5:00 - 7:00", "Whispered affirmation", "Silently repeat: 'I am here. I am safe. I am enough.'")
        ),
        closingAffirmation = "My heart knows how to beat in peaceful rhythm.",
        rewardBadgeId = "badge-serenity", code = "0208", status = ChallengeStatus.DEFAULT
    ),
    Challenge(
        id = "chal-9", number = 9, phase = Phase.CALM, phaseNumber = 5,
        title = "Temple & Jaw Softening",
        shortDesc = "A gentle facial acupressure sequence to release jaw clenching, TMJ tension, and temple tightness.",
        expert = EXPERTS[1], duration = "8 min", intensity = "Gentle", equipment = "Drop of natural facial oil (optional)",
        learningPoints = listOf(
            "Release masseter muscle bracing caused by unspoken emotion",
            "Soothe headache triggers around temples and forehead",
            "Allow the tongue to drop away from the roof of the mouth"
        ),
        hasVideo = true, videoType = "somatic",
        steps = listOf(
            PracticeStep("0:00 - 2:00", "Jaw circle release", "Open mouth slightly. Use two fingers to circle the masseter joint near ears."),
            PracticeStep("2:00 - 5:00", "Temple spirals", "Gently massage temples in circular motions with light pressure."),
            PracticeStep("5:00 - 8:00", "Tongue rest", "Part teeth slightly, let the tongue rest heavy and flat.")
        ),
        closingAffirmation = "I loosen my grip on words that no longer need saying.",
        rewardBadgeId = "badge-release", code = "0209"
    ),

    // PHASE 3: FEEL (Cards 10 to 13)
    Challenge(
        id = "chal-10", number = 10, phase = Phase.FEEL, phaseNumber = 1,
        title = "Somatic Emotional Weather Mapping",
        shortDesc = "Mapping physical sensations to emotional states without judgment or fixing.",
        expert = EXPERTS[3], duration = "12 min", intensity = "Restorative", equipment = "Journal and pen",
        learningPoints = listOf(
            "Decouple emotional sensation from anxiety spirals",
            "Locate where emotions live in the physical body",
            "Cultivate curiosity instead of resistance"
        ),
        hasVideo = false, noVideoType = "journal",
        noVideoPrompt = "Close your eyes and ask your body: What is the weather inside right now? Is there fog in the mind, heat in the chest, or rain behind the eyes?",
        steps = listOf(
            PracticeStep("0:00 - 3:00", "Internal weather check", "Sit in stillness, scan from crown to toes."),
            PracticeStep("3:00 - 8:00", "Inscribe the landscape", "Write 5 adjectives describing the somatic textures inside."),
            PracticeStep("8:00 - 12:00", "Gentle acceptance", "Place hands over the area holding the most weather. Breathe warmth into it.")
        ),
        closingAffirmation = "Every emotion is a passing visitor; none are permanent residents.",
        rewardBadgeId = "badge-compassion", code = "0310"
    ),
    Challenge(
        id = "chal-11", number = 11, phase = Phase.FEEL, phaseNumber = 2,
        title = "The Resonant Sigh",
        shortDesc = "Audible vocal sighs that vibrate the larynx and vagus nerve to release trapped tension.",
        expert = EXPERTS[2], duration = "6 min", intensity = "Gentle", equipment = "Private space",
        learningPoints = listOf(
            "Stimulate the recurrent laryngeal nerve branch",
            "Discharge tension trapped in the vocal chords",
            "Experience permission to take up auditory space"
        ),
        hasVideo = true, videoType = "somatic",
        steps = listOf(
            PracticeStep("0:00 - 2:00", "Inhale deep", "Breathe in through nose, filling chest and belly completely."),
            PracticeStep("2:00 - 4:00", "Audible sigh", "Exhale with an open mouth and an audible 'Haaaa' sound. Repeat 6 times."),
            PracticeStep("4:00 - 6:00", "Resonant hum", "Inhale, then exhale with lips closed in a steady 'Mmmmm' hum.")
        ),
        closingAffirmation = "My voice is allowed to express ease, weight, and freedom.",
        rewardBadgeId = "badge-voice", code = "0311"
    ),
    Challenge(
        id = "chal-12", number = 12, phase = Phase.FEEL, phaseNumber = 3,
        title = "Mirror Compassion Gaze",
        shortDesc = "A gentle 5-minute unhurried mirror exercise meeting your own eyes with softness.",
        expert = EXPERTS[3], duration = "8 min", intensity = "Restorative", equipment = "Mirror in soft lighting",
        learningPoints = listOf(
            "Break the habit of critical cosmetic scanning",
            "Experience self-recognition and tenderness",
            "Calm the sympathetic shame response"
        ),
        hasVideo = false, noVideoType = "mirror",
        noVideoPrompt = "Look into your own left eye. Do not fix hair or adjust makeup. Simply look at the woman looking back at you with unconditional gentleness.",
        steps = listOf(
            PracticeStep("0:00 - 2:00", "Arrive at reflection", "Sit comfortably in front of a mirror with soft lighting."),
            PracticeStep("2:00 - 5:00", "Soft gaze", "Breathe slowly while meeting your own gaze. Drop shoulder tension."),
            PracticeStep("5:00 - 8:00", "Hand to heart", "Place a hand over your heart and whisper: 'I see you. You are doing well.'")
        ),
        closingAffirmation = "I look upon myself with the eyes of a loving elder sister.",
        rewardBadgeId = "badge-radiant", code = "0312"
    ),
    Challenge(
        id = "chal-13", number = 13, phase = Phase.FEEL, phaseNumber = 4,
        title = "Spinal Ripple & Sigh",
        shortDesc = "Fluid, cat-cow style undulating waves along the entire spine to dissolve emotional stagnation.",
        expert = EXPERTS[1], duration = "10 min", intensity = "Gentle", equipment = "Yoga mat",
        learningPoints = listOf(
            "Hydrate the intervertebral discs",
            "Release emotional holding along the central nervous axis",
            "Reawaken natural somatic rhythm"
        ),
        hasVideo = true, videoType = "yoga",
        steps = listOf(
            PracticeStep("0:00 - 3:00", "Tabletop arrival", "On all fours, align wrists under shoulders and knees under hips."),
            PracticeStep("3:00 - 7:00", "Spinal waves", "Inhale, drop belly, look up softly. Exhale, round spine, let head hang heavy."),
            PracticeStep("7:00 - 10:00", "Child's pose rest", "Press hips back onto heels, forehead resting on mat, arms extended.")
        ),
        closingAffirmation = "My spine is fluid, resilient, and supported by grace.",
        rewardBadgeId = "badge-resilience", code = "0313"
    ),

    // PHASE 4: UNDERSTAND (Cards 14 to 17)
    Challenge(
        id = "chal-14", number = 14, phase = Phase.UNDERSTAND, phaseNumber = 1,
        title = "Cycle Rhythm Awareness",
        shortDesc = "Deciphering your monthly hormonal seasons and honoring biological tempo.",
        expert = EXPERTS[0], duration = "12 min", intensity = "Restorative", equipment = "Reset Box Cycle wheel or app tracker",
        learningPoints = listOf(
            "Understand the energetic shifts between Follicular, Ovulatory, Luteal, and Menstrual phases",
            "Eliminate guilt regarding natural energy fluctuations",
            "Plan restorative practices around cycle dips"
        ),
        hasVideo = true, videoType = "somatic",
        steps = listOf(
            PracticeStep("0:00 - 3:00", "Cycle baseline", "Identify where you are in your cycle today (Day 1 = first day of period)."),
            PracticeStep("3:00 - 8:00", "Phase reflection", "Observe whether your body is calling for movement (Follicular/Ovulation) or inward stillness (Luteal/Menstrual)."),
            PracticeStep("8:00 - 12:00", "Sanctuary intention", "Set one gentle boundary that honors your current phase.")
        ),
        closingAffirmation = "I honor my seasons: I am not meant to bloom year-round.",
        rewardBadgeId = "badge-insight", code = "0414"
    ),
    Challenge(
        id = "chal-15", number = 15, phase = Phase.UNDERSTAND, phaseNumber = 2,
        title = "The Architecture of Boundaries",
        shortDesc = "Constructing compassionate, clear emotional and time boundaries without guilt.",
        expert = EXPERTS[3], duration = "14 min", intensity = "Restorative", equipment = "Journal",
        learningPoints = listOf(
            "Recognize physical signs of boundary breaches (jaw clench, stomach flutter)",
            "Practice the phrase: 'I need to check my capacity and get back to you'",
            "Transform people-pleasing into somatic self-respect"
        ),
        hasVideo = false, noVideoType = "journal",
        noVideoPrompt = "What is one thing you agreed to recently that made your stomach clench? What would your body say if it had the courage to decline?",
        steps = listOf(
            PracticeStep("0:00 - 4:00", "Somatic scan of yes", "Notice how your body feels when you say an authentic Yes vs an anxious Yes."),
            PracticeStep("4:00 - 9:00", "Inscribing limits", "Write down 3 things you will protect this week with gentle firmness."),
            PracticeStep("9:00 - 14:00", "Integration breath", "Breathe into the back of your heart, honoring your perimeter.")
        ),
        closingAffirmation = "A clear 'No' to the world is a loving 'Yes' to myself.",
        rewardBadgeId = "badge-boundary", code = "0415"
    ),
    Challenge(
        id = "chal-16", number = 16, phase = Phase.UNDERSTAND, phaseNumber = 3,
        title = "Circadian Dusk Ritual",
        shortDesc = "Aligning melatonin release with sunset rhythms to restore restorative deep sleep.",
        expert = EXPERTS[3], duration = "10 min", intensity = "Restorative", equipment = "Warm herbal infusion or warm water",
        learningPoints = listOf(
            "Dim blue light cues 90 minutes before rest",
            "Downshift from sympathetic performance to parasympathetic receptivity",
            "Sip warm fluids slowly to warm the digestive fire"
        ),
        hasVideo = true, videoType = "somatic",
        steps = listOf(
            PracticeStep("0:00 - 3:00", "Light dimming", "Lower lights in your room. Put away high-stimulus screens."),
            PracticeStep("3:00 - 7:00", "Warm sips", "Sip warm herbal water slowly, feeling warmth travel down esophagus into stomach."),
            PracticeStep("7:00 - 10:00", "Quiet blessing", "Thank your eyes, hands, and feet for supporting you throughout the day.")
        ),
        closingAffirmation = "The day is done. There is nothing more I need to accomplish tonight.",
        rewardBadgeId = "badge-dusk", code = "0416"
    ),
    Challenge(
        id = "chal-17", number = 17, phase = Phase.UNDERSTAND, phaseNumber = 4,
        title = "Internal Critic Softening",
        shortDesc = "Reframing harsh inner judgment into the voice of a protective, gentle guardian.",
        expert = EXPERTS[3], duration = "12 min", intensity = "Restorative", equipment = "Journal",
        learningPoints = listOf(
            "Recognize the protective origin of inner criticism",
            "Lower vocal volume and harshness of thoughts",
            "Adopt the tone of an unconditional friend"
        ),
        hasVideo = false, noVideoType = "journal",
        noVideoPrompt = "Write down the exact sentence your mind repeats when you feel inadequate. Now write the response your dearest grandmother or elder sister would offer.",
        steps = listOf(
            PracticeStep("0:00 - 3:00", "Observe the sentence", "Bring to mind the recurring critical thought without judgment."),
            PracticeStep("3:00 - 8:00", "The elder's translation", "Inscribe the compassionate reframe."),
            PracticeStep("8:00 - 12:00", "Somatic embrace", "Cross arms and gently stroke the sides of your shoulders.")
        ),
        closingAffirmation = "I am worthy of the same kindness I so freely give others.",
        rewardBadgeId = "badge-clarity", code = "0417"
    ),

    // PHASE 5: CONNECT (Cards 18 to 21)
    Challenge(
        id = "chal-18", number = 18, phase = Phase.CONNECT, phaseNumber = 1,
        title = "Sacred Tea Tasting in Stillness",
        shortDesc = "A single-pointed mindfulness ritual engaging all five senses with a warm cup of herbal tea.",
        expert = EXPERTS[3], duration = "10 min", intensity = "Restorative", equipment = "A warm cup of herbal tea",
        learningPoints = listOf(
            "Anchor attention in tactile warmth and scent",
            "Interrupt mental multitasking",
            "Experience complete presence in a daily mundane gesture"
        ),
        hasVideo = false, noVideoType = "somatic",
        noVideoPrompt = "Hold the warm cup with both palms. Inhale the steam. Take three sips without speaking, scrolling, or thinking of next steps.",
        steps = listOf(
            PracticeStep("0:00 - 2:00", "Warmth arrival", "Feel the weight and heat of the cup in your hands."),
            PracticeStep("2:00 - 6:00", "Sensory sipping", "Sip slowly, tasting every herbal note and noticing swallowing sensation."),
            PracticeStep("6:00 - 10:00", "Quiet gratitude", "Rest in silence until the cup is empty.")
        ),
        closingAffirmation = "In this single cup, the entire universe is still.",
        rewardBadgeId = "badge-presence", code = "0518"
    ),
    Challenge(
        id = "chal-19", number = 19, phase = Phase.CONNECT, phaseNumber = 2,
        title = "Metta Loving-Kindness Circle",
        shortDesc = "Radiating loving-kindness first to yourself, then to your loved ones, and finally to all sisters.",
        expert = EXPERTS[3], duration = "10 min", intensity = "Restorative", equipment = "Comfortable seat",
        learningPoints = listOf(
            "Cultivate universal warmth and goodwill",
            "Release resentment through gentle wishes of wellbeing",
            "Connect energetic roots with women walking the same journey"
        ),
        hasVideo = true, videoType = "sound",
        steps = listOf(
            PracticeStep("0:00 - 3:00", "Loving self", "Place palm on heart. Silently repeat: 'May I be happy. May I be safe. May I be at peace.'"),
            PracticeStep("3:00 - 7:00", "Loving a dear one", "Picture a loved one and repeat the blessing for them."),
            PracticeStep("7:00 - 10:00", "Loving all women", "Picture women across the world, holding hands in quiet solidarity.")
        ),
        closingAffirmation = "My heart has infinite room for love, forgiveness, and peace.",
        rewardBadgeId = "badge-unity", code = "0519"
    ),
    Challenge(
        id = "chal-20", number = 20, phase = Phase.CONNECT, phaseNumber = 3,
        title = "Shared Solitude in Relationship",
        shortDesc = "Navigating intimacy, personal space, and existing peacefully alongside a partner without performing.",
        expert = EXPERTS[3], duration = "12 min", intensity = "Restorative", equipment = "Journal",
        learningPoints = listOf(
            "Differentiate between intimacy and codependency",
            "Release the burden of always maintaining conversational energy",
            "Honor personal space as a gift to the relationship"
        ),
        hasVideo = false, noVideoType = "journal",
        noVideoPrompt = "How do you preserve your inner sanctuary while being in love? Write about what you need in order to feel completely yourself in shared rooms.",
        steps = listOf(
            PracticeStep("0:00 - 4:00", "Inquiry", "Close eyes and sense your personal energetic perimeter."),
            PracticeStep("4:00 - 9:00", "Inscribing sanctuary", "List 2 rituals that are purely yours and non-negotiable."),
            PracticeStep("9:00 - 12:00", "Soft gratitude", "Breathe into the truth that love thrives where two souls hold each other in freedom.")
        ),
        closingAffirmation = "I can be deeply connected to another while remaining wholly myself.",
        rewardBadgeId = "badge-harmony", code = "0520"
    ),
    Challenge(
        id = "chal-21", number = 21, phase = Phase.CONNECT, phaseNumber = 4,
        title = "Equilibrium: The 21-Day Completion",
        shortDesc = "The closing integration challenge celebrating your full circle of reset, presence, and balance.",
        expert = EXPERTS[3], duration = "15 min", intensity = "Restorative", equipment = "Your Reset Box & collected cards",
        learningPoints = listOf(
            "Integrate all 5 phases: Move, Calm, Feel, Understand, Connect",
            "Celebrate showing up for yourself consistently across 21 rituals",
            "Establish your ongoing daily sanctuary practice"
        ),
        hasVideo = true, videoType = "sound",
        steps = listOf(
            PracticeStep("0:00 - 4:00", "Honoring the journey", "Spread your 21 cards out or hold the physical box. Take a deep, reverent breath."),
            PracticeStep("4:00 - 10:00", "Full somatic alignment", "One palm on heart, one palm on belly. Feel the rooted calm in your bones."),
            PracticeStep("10:00 - 15:00", "Sanctuary seal", "Sound the singing bowl. You have arrived in your center.")
        ),
        closingAffirmation = "I carry my sanctuary within me wherever I go. Harmony is my birthright.",
        rewardBadgeId = "badge-mastery", code = "0521"
    )
)
```

### 4.2 Expert Doctors & Somatic Guides

```kotlin
val EXPERTS = listOf(
    Expert(
        id = "exp-1",
        name = "Dr. Meera Varma",
        role = "Integrative Women’s Physician",
        speciality = "Hormonal Balance & Circadian Rest",
        avatarUrl = "https://images.unsplash.com/photo-1594824813589-913617300407?auto=format&fit=crop&w=240&q=80",
        bio = "Dr. Meera has spent over 14 years researching the interplay between the autonomic nervous system, endocrine rhythms, and female restorative health. Her guidance prioritizes zero-pressure somatic awareness.",
        challengesLed = listOf(1, 4, 8, 14)
    ),
    Expert(
        id = "exp-2",
        name = "Tara Sen",
        role = "Somatic Movement Therapist",
        speciality = "Pelvic Floor Ease & Spinal Waves",
        avatarUrl = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80",
        bio = "Tara blends trauma-informed somatic therapy with slow kinetic uncoiling. She empowers women to inhabit their bodies with safety, grace, and steady gravity.",
        challengesLed = listOf(2, 3, 9, 13)
    ),
    Expert(
        id = "exp-3",
        name = "Radhika Nair",
        role = "Ayurvedic Breathwork Guide",
        speciality = "Pranayama & Vagus Nerve Coherence",
        avatarUrl = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80",
        bio = "Rooted in traditional Kerala Ayurvedic breath disciplines and contemporary neuroscience, Radhika guides gentle breathing paces that quiet nocturnal rumination.",
        challengesLed = listOf(5, 6, 7, 11)
    ),
    Expert(
        id = "exp-4",
        name = "Dr. Shalini Rao",
        role = "Clinical Perinatal Psychologist",
        speciality = "Compassionate Inquiry & Boundary Design",
        avatarUrl = "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&q=80",
        bio = "Dr. Shalini works with women navigating significant life transitions—marriage, postpartum shifts, and personal individuation—grounded in unconditional gentleness.",
        challengesLed = listOf(10, 12, 15, 16, 17, 18, 19, 20, 21)
    )
)
```

### 4.3 Collectible Badges & Skill Shop Catalog

#### 12 Collectible Badges
1. `badge-grounded`: **Grounded Anchor** (Icon: Footprints) — *Earned after Barefoot Earth Connection*
2. `badge-flow`: **Pelvic Basin Ease** (Icon: Waves) — *Earned after Pelvic Basin Wave*
3. `badge-freedom`: **Unburdened Shoulders** (Icon: Wind) — *Earned after Shoulder Unburdening Spiral*
4. `badge-vitality`: **Joint Fluidity** (Icon: Sun) — *Earned after Joint Lubrication*
5. `badge-breath`: **Ocean Whisper** (Icon: Wind) — *Earned after Ocean Wave Pranayama*
6. `badge-tranquil`: **Deep Nidra Rest** (Icon: Coffee) — *Earned after Warm Stone Yoga Nidra*
7. `badge-cool`: **Chandra Moon Ray** (Icon: Sparkles) — *Earned after Moon Breath*
8. `badge-serenity`: **Heart Sanctuary** (Icon: Heart) — *Earned after Palm Over Heart*
9. `badge-compassion`: **Inner Compassion** (Icon: Eye) — *Earned after Somatic Weather Mapping*
10. `badge-voice`: **Resonant Release** (Icon: Flame) — *Earned after Resonant Sigh*
11. `badge-radiant`: **Mirror Sister** (Icon: Shield) — *Earned after Mirror Compassion Gaze*
12. `badge-mastery`: **Sanctuary Mastery** (Icon: Crown) — *Earned after completing all 21 challenges*

#### Skill Shop Items (Redeemable with Coins)
| ID | Title | Description | Cost | Emoji | Category |
|---|---|---|---|---|---|
| `s1` | Bonus Expert Practice | Unlock an exclusive 20-min deep practice with Dr. Priya Sharma | 50 🪙 | 🌿 | Practice |
| `s2` | Guided Audio Session | A 15-min guided sleep restoration audio by Dr. Meera Kapoor | 40 🪙 | 🎵 | Audio |
| `s3` | Affirmation Pack: Radiance | 21 new affirmations for your inner light, curated by Yugal experts | 30 🪙 | ✨ | Affirmations |
| `s4` | Profile Theme: Dawn | A warm sunrise colour theme for your personal space | 20 🪙 | 🌅 | Theme |
| `s5` | Cycle Ritual Guide | Phase-by-phase rituals aligned to your cycle, in PDF | 60 🪙 | 🌙 | Guide |
| `s6` | Profile Theme: Midnight | Deep velvet theme with soft glow accents | 20 🪙 | 🌌 | Theme |

---

## 5. END-TO-END SCREEN IMPLEMENTATIONS

### 5.1 Onboarding Flow (`OnboardingFlow.kt`)

The onboarding experience is an unhurried 7-step sequence:
- **Step 1: Splash Screen (2.4s auto-advance)**:
  - Centered glowing circles (`GlowingCircles(size = 240.dp, pulsing = true)`).
  - Centered app logo (`res/drawable/yugal_logo.png`).
  - Text: *"Curated by women from all phases of life"*.
  - Discrete *"Skip"* button.
- **Step 2: Welcome to Yugal**:
  - Greeting: *"A private sanctuary for your 21-day Reset Box"*.
  - Subtitle: *"Scan physical cards, practise short restorative rituals with women's health experts, and gently restore your natural rhythm."*
  - CTA: *"Get Started"* Button.
- **Step 3: Registration / Sign Up**:
  - Avatar picker with camera badge.
  - Form: First Name (Default: "Ananya"), Email/Mobile, 4-digit OTP.
- **Step 4: Activate Your Reset Box**:
  - Explains the 8-character activation code printed on the inner lid of the box.
  - Input field for code (e.g., `YUGAL-RESET-0842`).
  - QR Code scanner preview option.
  - Bypass link: *"I don't have my box right now (Activate later)"*.
- **Step 5: Life Phase Selection**:
  - 6 large interactive cards with custom glowing ambient orbs:
    1. **Unmarried / Solo Sanctuary** (Colors: Amber, Orange, Sky)
    2. **Recently Married** (Colors: Magenta, Amber, Violet)
    3. **Postpartum Recovery** (Colors: Sky, Magenta, Emerald)
    4. **Pregnancy Journey** (Colors: Orange, Amber, Sky)
    5. **Peri Menopause Transition** (Colors: Magenta, Amber, Violet)
    6. **Post Menopause Harmony** (Colors: Sky, Magenta, Emerald)
  - Bypass link: *"Prefer not to say"*.
- **Step 6: Clinical Wellness Assessment**:
  - Card with ShieldCheck icon: *"Understand your body's unique needs"*.
  - Badges: `Sleep`, `Stress`, `Hormonal Rhythm`, `Energy`.
  - Button: *"Take Your Assessment"* (Opens browser to `https://assessment.yugalwellness.com`).
  - Secondary button: *"Skip for now — I'll do it later"*.
- **Step 7: 4-Card Quick Tour**:
  - Horizontal swipeable pager with dot indicators:
    1. **TACTILE FREEDOM**: *"Pick any card from your box. There is no right order."*
    2. **SEAMLESS SCAN**: *"Scan the QR and your challenge opens."*
    3. **EXPERT GUIDANCE**: *"Practise with an expert, then mark it done."*
    4. **INNER EQUILIBRIUM**: *"Watch how you are growing, and ask Yugal AI anything, privately."*
  - CTA on slide 4: *"Enter Your Sanctuary"*. Triggers 528 Hz singing bowl.

### 5.2 Header & Audio Status Bar (`Header.kt`)

A sticky top bar:
- **Left**: 36dp rounded logo (`/assets/yugal-logo.png`) + titles:
  - `"yugal"` (14sp ExtraBold, tracking tight).
  - `"HARMONY HELD IN BALANCE"` (10sp, tracking 0.12em uppercase, muted).
- **Right**:
  - **Cloud Sync Chip**: `Cloud` icon + `"Synced"` text (blue when signed in, gold when offline). Tap triggers Google Sign-In.
  - **Sound Toggle Button**: 36dp circle button. Icon `Volume2` (amber) when enabled, `VolumeX` when muted. Toggling on plays singing bowl at 432 Hz.

### 5.3 Bottom Floating Navigation with Spectrum QR Scan Hub (`Navigation.kt`)

A floating pill-shaped navigation bar elevated above the bottom of the screen:
- **Dimensions**: 64dp height, rounded 999dp (fully rounded capsule), white surface with `0 12px 40px rgba(4,22,42,0.16)` shadow.
- **Left Slot**:
  - **Home**: Home icon (20dp) + label "Home" + 6dp active amber indicator dot.
  - **Phases**: ActivitySquare icon (20dp) + label "Phases".
- **Center Floating QR Scan Hub**:
  - Absolute positioned button: 60dp circle elevated 18dp above the nav pill bar.
  - Background: `SpectrumGradient` with pulse glow.
  - Icon: `QrCode` (24dp, white).
  - Press animation: scale to 0.95 with soft tap sound.
  - Accessible title: *"Scan your card"*.
- **Right Slot**:
  - **Journal**: BookOpen icon (20dp) + label "Journal".
  - **Yugal AI**: Bot icon (20dp) + label "Yugal AI".

### 5.4 Home Dashboard (`HomeScreen.kt`)

```
+-------------------------------------------------------------+
| Header: yugal logo | Sync status | Sound toggle             |
+-------------------------------------------------------------+
| Monday, Nov 10                                              |
| Hello, Ananya              [🪙 85]  [🔥 3]  [ Avatar Button]|
+-------------------------------------------------------------+
| >>> SACRED TICKER: Harmony held in balance • Return to you..|
+-------------------------------------------------------------+
| RESET BOX CARD (Deep Indigo #04162A)                        |
|   "Reset box"                                               |
|   "3 of 21 challenges completed"   [ RadialProgressRing ]   |
|   "You are in CALM. One card at a time."                    |
+-------------------------------------------------------------+
| How are you feeling today?                                  |
| [ 🌧️ Low ] [ 🌙 Tired ] [ 🌿 Okay ] [ ☀️ Good ] [ ✨ Radiant ]|
+-------------------------------------------------------------+
| What's on your mind? (Encrypted Vault)              0/280   |
| [ Textarea: Record a sensation, ease or unsaid tension... ] |
|  🔒 Encrypted & strictly private                 [ Save -> ]|
+-------------------------------------------------------------+
| TODAY'S SACRED AFFIRMATION (Amber Tint #FFE7A8)             |
|   "Gravity welcomes my complete weight without condition."  |
|   — A Yugal wellness initiative               [ Bookmark ]  |
+-------------------------------------------------------------+
| Day 14 · Ovulation window                                   |
| Energy is rising, a good day for MOVE challenges       [ > ]|
+-------------------------------------------------------------+
| [ Primary Button: Scan your card              (QrCode)   ]  |
| [ Secondary Button: Pick at random            (Shuffle)  ]  |
+-------------------------------------------------------------+
```

### 5.5 CameraX QR Scanner (`ScannerScreen.kt`)

- **CameraX Preview**: Fast autofocus using back-facing wide-angle camera (`CameraSelector.DEFAULT_BACK_CAMERA`).
- **Reticle Viewfinder**:
  - 256dp x 256dp square reticle with 4 rounded spectrum-gradient corner brackets.
  - Top-left: Amber (`#FFB400`), Top-right: Orange (`#F2711C`), Bottom-left: Sky (`#1FA9E0`), Bottom-right: Magenta (`#C94A9B`).
  - Infinite scanning laser line: 4dp height gradient sweeping top to bottom over 2.4 seconds (`animate-scan-sweep`).
  - Center pulsing target ping.
- **Top Bar**: Close button (`X`), Title `"SCAN YOUR CARD"`, Flashlight toggle (`Zap` / `ZapOff`).
- **Recognition Handling**:
  - When a QR code is matched (e.g. `0208` or `#8`):
    1. Instantly trigger `SacredSoundManager.playScanSuccessChime()`.
    2. Freeze frame with emerald green pulse ring (`#34D399`).
    3. Pop chip: `"Card found: CALM - Challenge #8: Palm Over Heart"`.
    4. Automatically transition to `ChallengeUnlockedScreen`.
- **Manual Fallback**:
  - Bottom bar contains *"Enter code manually"* button and *"Pick a card for me"* button.
  - Manual input validates 4-digit card codes (`0101` through `0521`).

### 5.6 Challenge Journey Flow

#### Screen A: `ChallengeUnlockedScreen`
- Light numeral: card number rendered in `72sp` Outfit Light using the phase numeral color (`#1FA9E0` for Card 8).
- Glowing Circles: triple nested concentric pulsing circles (168dp).
- Title: `"Palm Over Heart Sanctuary"` (28sp ExtraBold).
- Expert Pill: 28dp round doctor avatar + name `"Dr. Meera Varma"`. Tap opens `ExpertsModal`.
- Attribute Chips: Duration `"7 min"` (Clock), Intensity `"Gentle"` (Sparkles), Equipment `"No equipment"` (Shield).
- What You'll Work On: 3 checkmarked bullet points with amber icons.
- Sensitive Health Disclaimer: *"Check with your doctor first if you are pregnant or postpartum."*
- Reward Preview: Pill showing `🪙 Earn 10 coins`.
- Primary Button: `"Begin Challenge"` with Play icon.

#### Screen B: `ChallengePracticeScreen` (Deep Indigo Background `#04162A`)
- **Video Mode (when `hasVideo = true`)**:
  - 16:9 aspect video container with play/pause center button and timecode bar (`0:00 / 7:00`).
  - 20-second interval automatic floating toast encouragements:
    - *"You're doing beautifully 🌸"*
    - *"Take it at your own pace. You're exactly where you need to be."*
    - *"Your body is wise. Trust it."*
- **No-Video Somatic Invitation (when `hasVideo = false`)**:
  - Glowing pulsing circles with large prompt text in quotation marks.
- **Interactive Step Progression**:
  - Follow-along progression cards showing timecode, step title, and instructions.
  - Tapping marks steps as done with a checkmark badge.
- **Compulsory AI Verification Sheet**:
  - Bottom button is locked to `"Verify with AI"`.
  - *"Mark as Done unlocks after AI verification"*.
  - **Multi-Step Flow**:
    1. *Choose Method*: Option 1: 10-30s Practice Video clip; Option 2: Written somatic reflection (minimum 10 characters).
    2. *Privacy Consent*: Clear guarantee: *"Your video is used only to check your practice and is then permanently deleted. It is never stored, shared, or used to train any model."*
    3. *Analysis Phase*: 3-stage progress bar:
       - 10%: *"Extracting posture orientation..."*
       - 48%: *"Evaluating somatic alignment and breath rhythm..."*
       - 85%: *"Cross-referencing with expert guidance..."*
    4. *Result*:
       - If passed (80% rate): Emerald checkmark + chime + `+10 coins unlocking...` + auto-transition to completion.
       - If retry: Gentle guidance: *"Your palm position looked great. Try relaxing your shoulders a little more..."*

#### Screen C: `ChallengeCompletionScreen`
- Confetti/orb background animation with multi-colored ambient glows.
- Heading: `"Challenge completed"` (36sp).
- Badges earned: `+10 coins` pill + `Streak +1` pill.
- Closing Affirmation Card: Quotation in 17sp font: *“My heart knows how to beat in peaceful rhythm.”*
- Newly Unlocked Badge Card: Shows badge title and sparkles icon.
- Actions: Primary `"See Progress"` (Returns to Home) and Secondary `"Pick another card"` (Opens Scanner).

### 5.7 Cycle & Rhythm Tab (`CycleTab.kt`)

Supports 4 distinct life modes:

#### 1. Regular Cycle Mode
- **Cycle Dial Ring**: 140dp circular SVG progress ring with spectrum sweep gradient showing Day X of 28.
- **Phase Label**: Color-coded pill (`Menstrual`: Rose, `Follicular`: Amber, `Ovulation`: Emerald, `Luteal`: Violet).
- **Interactive Calendar Grid**:
  - 7-column calendar showing full month.
  - Red dot: Menstrual flow days.
  - Amber dot: Ovulation day.
  - Sky blue dot: Fertile window.
  - Tapping any date opens day details.
- **Quick Symptom & Sensation Logger**:
  - 8 one-tap chips: *Restful sleep*, *High stamina*, *Sensory clarity*, *Deep intuition*, *Tender breasts*, *Pelvic warmth*, *Light cramping*, *Sweet cravings*.
  - Multi-line custom symptom input.

#### 2. Pregnancy Mode
- Trimester ring (Week 1 to 40) with baby fruit/vegetable size comparison:
  - Week 8: *a blueberry*
  - Week 12: *a lime*
  - Week 20: *an avocado*
  - Week 24: *a papaya*
  - Week 36: *a small pumpkin*
- Due date counter and trimester-specific advice.

#### 3. Perimenopause & Menopause Modes
- Gentle symptom loggers: Hot flashes, night sweats, sleep issues, brain fog, irregular periods.
- Pattern insight: *"Hot flashes appear most often in the evening. Sleep quality has been moderate. Your patterns are your guide — not a diagnosis."*
- Direct shortcut: *"Talk to Yugal AI about this"*.

### 5.8 Private Journal & Community Discussion (`JournalTab.kt`)

#### Sub-Tab A: Private Journal (Encrypted Personal Vault)
- Privacy indicator: `"Private to you"` with lock icon + count.
- Full-text search bar.
- Mood filter pills: `ALL`, `Radiant`, `Good`, `Okay`, `Tired`, `Low`.
- List of reflection entries with timestamps, mood emoji, phase tag, title, and content.
- Floating `+` button opens **Inscribe Private Reflection** sheet:
  - Title or realization.
  - *"How did your physical vessel feel?"* (Multi-line textarea).
  - Optional link to one of the 21 challenge cards.
  - Button: *"Seal Reflection in Sanctuary"*.

#### Sub-Tab B: Group Discussion (Sanctuary Sister Feed)
- Banner: *"Be kind. This is a supportive space visible to other Reset Box members."*
- Filter tabs: `"For you"`, `"My phase"`, `"Following"`.
- Phase chips: `ALL`, `MOVE`, `CALM`, `FEEL`, `UNDERSTAND`, `CONNECT`.
- Twitter/X-style feed cards:
  - Author avatar, display name, `@handle`, time ago.
  - Optional phase-colored challenge tag (e.g. `CALM · Challenge 8`).
  - Reflection text (280 characters max).
  - Action bar: Reply count, Repost count, Like button (heart fills red on like), Share.
  - More menu: *"Mute member"*, *"Report post"*.
- Floating Compose Button:
  - Allows posting with regular profile or checking *"Post anonymously"* (replaces name with *"Sanctuary Sister"* and anonymized avatar).
- Thread Detail View: Full hierarchical comment thread and replies.

### 5.9 Yugal AI Companion (`YugalAiTab.kt`)

- **Tone**: Calm, respectful, compassionate, non-judgmental.
- **Suggested Topic Chips**:
  - *"My cycle & fatigue"*
  - *"Hormonal balance"*
  - *"Pregnancy inquiry"*
  - *"Body changes"*
  - *"Postpartum recovery"*
  - *"Newly married intimacy"*
  - *"Pelvic floor relaxation"*
- **MANDATORY CLINICAL SAFETY TRIAGE PROTOCOL**:
  - If user message contains keywords (`chest pain`, `bleeding heavily`, `fainted`, `emergency`, `severe pain`, `suicide`, `harm`):
    1. Immediately plays low grounding tone (320 Hz, 3s).
    2. Generates high-priority **RED ALERT CARD**:
       - Title: `URGENT CARE PROTOCOL`
       - Message: *"Ananya, please pause and breathe with me. What you are describing requires immediate clinical attention from a medical professional or emergency medical services."*
       - Direct dialable emergency helplines:
         - National Emergency: **112 / 911**
         - Women's Crisis & Care Line: **1091**
         - Maternal Emergency Department
    3. Appends disclaimer: *"Yugal AI is not equipped to handle acute medical urgencies. Please seek qualified physical care right away. Your life and wellbeing are sacred."*
- **Persistent Disclaimer**:
  - Rendered at the bottom of the screen at all times:
  - `* Yugal AI is not a substitute for medical advice, clinical diagnosis, or emergency healthcare.`

### 5.10 Profile & Equilibrium Dashboard (`ProfileTab.kt`)

- Profile Header: Avatar, Name, *"Reset Box Member"*, Box Code activated (`YUGAL-RESET-0842`), Member since date.
- **Equilibrium Progress Card**:
  - Centered `RadialProgressRing` (160dp).
  - Text: `X of 21 challenges completed`.
  - Quote: *“Harmony held in balance.”*
- **This Week Practised Days Row**:
  - 7 columns: `M`, `T`, `W`, `T`, `F`, `S`, `S`.
  - Completed days have a spectrum gradient circle with checkmark; incomplete days show a subtle dot.
- **Five Phases Progression**:
  - Shows each phase as `Completed`, `Current Focus`, or `To Come`.
- **Navigation Links**:
  - Rewards & Badges (12 total).
  - Saved Affirmations.
  - Women's Health Experts Directory.
  - Settings & Privacy.
  - Log Out.

### 5.11 Modals & Sheets

#### 1. RewardsModal (`RewardsModal.kt`)
- 3 Tabs: **Badges**, **Coins**, **Skill Shop**.
- Badges tab shows 12 badges with filter pills (`ALL`, `earned`, `in_progress`, `locked`).
- Coins tab displays coin balance, weekly goal ring, streak bonus info, and coin earning ledger.
- Skill Shop tab enables purchasing exclusive guided audio sessions, affirmation packs, and themes with earned coins. Includes confirmation bottom sheet.

#### 2. ExpertsModal (`ExpertsModal.kt`)
- Directory of all 4 medical experts with photos, medical credentials, specialities, and bios.
- Tapping an expert displays their detailed profile and a list of all challenge cards led by them, with one-tap shortcuts to launch those challenges directly.

#### 3. AffirmationModal (`AffirmationModal.kt`)
- Fullscreen modal with triple concentric pulsing circles.
- Large italic quotation text.
- Primary CTA: *"Save to Sanctuary"* (toggles bookmark status).
- Secondary CTA: *"Share with Sister"* (copies quotation to clipboard and displays green check toast).

#### 4. SettingsModal (`SettingsModal.kt`)
- **Appearance Toggle**: Light mode vs Dark mode selector.
- **Preferences**: Daily gentle notification reminders toggle, Vault encryption status badge (`LOCKED`).
- **Current Life Phase**: Dropdown allowing user to switch life phase at any time.
- **Assessment**: Shortcut to retake baseline clinical wellness assessment.
- **Account Actions**: Log Out button and destructive *"Delete Account & Inscriptions"* confirmation dialog.

---

## 6. FIREBASE, DATABASE & LOCAL STORAGE LAYER

### 6.1 Firestore Collections & Schema

All Firestore operations in the web app map to the following paths:

```
/users/{userId}
  ├── userId: String
  ├── name: String
  ├── email: String
  ├── avatar: String
  ├── boxCode: String
  ├── isBoxActivated: Boolean
  ├── lifePhase: String
  ├── completedChallengesCount: Int
  ├── streakDays: Int
  ├── lastPracticedDays: List<Boolean>
  ├── savedAffirmationIds: List<String>
  ├── updatedAt: Timestamp
  │
  ├── /challenges/{challengeId}
  │     ├── challengeId: String
  │     ├── challengeNumber: Int
  │     ├── phase: String
  │     ├── status: String ("completed")
  │     ├── completedAt: Timestamp
  │     ├── verifiedWithAi: Boolean
  │     ├── aiVerificationNotes: String
  │     └── videoFileName: String
  │
  ├── /journal/{entryId}
  │     ├── id: String
  │     ├── date: String
  │     ├── time: String
  │     ├── mood: String
  │     ├── title: String
  │     ├── preview: String
  │     ├── content: String
  │     ├── phaseTag: String
  │     ├── linkedChallengeId: String
  │     ├── isPrivate: Boolean (true)
  │     └── createdAt: Timestamp
  │
  └── /aiVerifications/{verificationId}
        ├── challengeId: String
        ├── challengeNumber: Int
        ├── status: String ("verified")
        ├── feedback: String
        ├── confidenceScore: Int (e.g. 98)
        ├── videoName: String
        └── timestamp: Timestamp

/communityPosts/{postId}
  ├── id: String
  ├── authorId: String
  ├── authorName: String
  ├── authorHandle: String
  ├── authorAvatar: String
  ├── isAnonymous: Boolean
  ├── content: String (max 280 chars)
  ├── phaseTag: String
  ├── challengeTag: String
  ├── likes: Int
  ├── reposts: Int
  ├── createdAt: Timestamp
  │
  └── /replies/{replyId}
        ├── id: String
        ├── authorName: String
        ├── authorHandle: String
        ├── authorAvatar: String
        ├── content: String
        ├── likes: Int
        └── createdAt: Timestamp
```

### 6.2 Offline-First Room Database Schema

For full offline capability when users practice in nature or disconnected retreats:

```kotlin
@Entity(tableName = "challenges")
data class ChallengeEntity(
    @PrimaryKey val id: String,
    val number: Int,
    val phase: String,
    val title: String,
    val shortDesc: String,
    val expertId: String,
    val duration: String,
    val intensity: String,
    val equipment: String,
    val status: String,
    val completedAt: String?,
    val code: String
)

@Entity(tableName = "journal_entries")
data class JournalEntryEntity(
    @PrimaryKey val id: String,
    val date: String,
    val time: String,
    val mood: String,
    val title: String,
    val content: String,
    val phaseTag: String?,
    val linkedChallengeId: String?,
    val isSynced: Boolean = false
)

@Entity(tableName = "cycle_logs")
data class CycleLogEntity(
    @PrimaryKey val date: String,
    val flowLevel: String?,
    val symptoms: String,         // Comma-separated
    val quickSymptoms: String,    // Comma-separated
    val mood: String?,
    val sleepHours: Float?,
    val notes: String?
)
```

---

## 7. MASTER ANDROID STUDIO IMPLEMENTATION PROMPT

You can paste the prompt below directly into Android Studio's Gemini / LLM coding assistant to build out any specific screen, module, or the entire app:

```text
You are an expert Android engineer specializing in Kotlin, Jetpack Compose, Material 3, and Clean Architecture.

I need you to build the native Android application for "Yugal" (The 21-Day Reset Box companion app) using the complete specifications provided below:

1. THEME & COLOR PALETTE:
   - Primary Cream Canvas: #F6EEE1
   - Card Surface: #FFFBF4
   - Midnight Ink: #04162A
   - Muted Slate: #5B6B7A
   - Brand Gold (Amber): #FFB400
   - Spectrum Gradient: LinearGradient(#FFB400, #F2711C, #E8452C, #C94A9B, #1FA9E0)
   - Font: Outfit (Light, Regular, Medium, SemiBold, ExtraBold)

2. CORE SCREENS TO IMPLEMENT:
   - OnboardingFlow: 7 steps (Splash, Welcome, Sign Up with OTP, Box Activation code YUGAL-RESET-XXXX, Life Phase assessment, Clinical Assessment link, 4-Card Quick Tour).
   - HomeScreen: Daily header, coin count (🪙 85), streak (🔥 3), scrolling sacred ticker, dark 21-challenge progress card with RadialProgressRing, 5-face mood picker, 280-char encrypted private journal input, today's affirmation, ovulation banner, and dual CTA buttons ("Scan your card", "Pick at random").
   - ScannerScreen: CameraX live preview with 4-corner spectrum reticle, vertical moving laser animation, flash toggle, manual code entry, and test simulation cards.
   - ChallengePracticeScreen: Video/Somatic view, interval encouraging toasts, follow-along progression steps, and compulsory AI Verification flow (short video or reflection analysis) before unlocking completion.
   - ChallengeCompletionScreen: Orb animation, +10 coins pill, streak increment, closing affirmation, and badge unlock.
   - CycleTab: 4 modes (Regular with 140dp dial ring, calendar and symptom logger; Pregnancy with fruit size comparisons; Perimenopause; Menopause).
   - JournalTab: Segmented toggle between Private Journal (search, mood filters, encrypted entries) and Group Discussion (public feed with anonymous posting, tags, like/repost actions, and threaded replies).
   - YugalAiTab: Conversational chat with topic chips, mandatory emergency triage protocol (red alert card with hotlines 112/911/1091 on critical keywords), and persistent medical disclaimer.
   - Modals: RewardsModal (Badges, Coins, Skill Shop), ExpertsModal (Doctor profiles and challenges led), AffirmationModal (Save and Share), and SettingsModal (Light/Dark mode, Life Phase changer, Vault status).

3. SOUND SYNTHESIS:
   - Implement SacredSoundManager with AudioTrack synthesizing a pure 432 Hz crystal singing bowl with 1.5x fifth overtone decay and a 4-note ascending chord chime (523Hz -> 659Hz -> 784Hz -> 1046Hz).

Ensure 100% adherence to all hex codes, layout spacing, audio synthesis parameters, and data models specified in the architecture document.
```
